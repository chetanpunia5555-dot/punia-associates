# PUNIA ASSOCIATES - AUTOMATED BARE ACTS INGESTION & DOWNLOAD REGISTRATION
# Native PowerShell script for Punia Associates Full-Stack App

param(
    [string[]]$SourceFolders = @("..\puniaassociates bareacts 1", "..\puniaassociates bare acts 2")
)

$ErrorActionPreference = "Stop"
$AppRoot = Get-Location
$StoredPdfDir = Join-Path $AppRoot "public\bare-acts\stored"
$DataDir = Join-Path $AppRoot "data"
$DbFile = Join-Path $DataDir "legalDatabase.json"

# Antigravity project mirror directory
$AntigravityProjectDir = "C:\Users\PC\antigravity\puniaassociates"
$AntigravityStoredPdfDir = Join-Path $AntigravityProjectDir "public\bare-acts\stored"
$AntigravityDbFile = Join-Path $AntigravityProjectDir "data\legalDatabase.json"

if (-not (Test-Path $StoredPdfDir)) {
    New-Item -ItemType Directory -Path $StoredPdfDir -Force | Out-Null
}
if (-not (Test-Path $DataDir)) {
    New-Item -ItemType Directory -Path $DataDir -Force | Out-Null
}
if (Test-Path $AntigravityProjectDir) {
    if (-not (Test-Path $AntigravityStoredPdfDir)) {
        New-Item -ItemType Directory -Path $AntigravityStoredPdfDir -Force | Out-Null
    }
}

# Category mapping aligned with app's BareAct category schema
function Get-AppCategory([string]$cleanTitle) {
    $lt = $cleanTitle.ToLower()
    if ($lt -match "constitution") { return "Constitutional" }
    if ($lt -match "penal|criminal|police|procedure|sanhita|suraksha|anti hijacking|black money") { return "Criminal" }
    if ($lt -match "civil|limitation|specific relief|evidence|adhiniyam|court fee|arbitration") { return "Civil & Procedural" }
    if ($lt -match "company|companies|insolvency|contract|factoring|government securities|securities|carriage") { return "Commercial & Corporate" }
    if ($lt -match "marriage|succession|guardians|wards|personal") { return "Family & Personal" }
    if ($lt -match "property|transfer of property|rent|tenures|ceiling|cantonments|land|rera") { return "Property & Revenue" }
    if ($lt -match "tax|gst|gift tax|revenue|customs") { return "Taxation" }
    if ($lt -match "labour|provident|remuneration|insurance|apprentice|gratuity|welfare fund|tribunals") { return "Labour & Service" }
    return "Special & Local Laws"
}

# Jurisdiction mapping
function Get-AppJurisdiction([string]$cleanTitle) {
    $lt = $cleanTitle.ToLower()
    if ($lt -match "delhi") { return "Delhi" }
    if ($lt -match "haryana") { return "Haryana" }
    if ($lt -match "punjab") { return "Punjab" }
    if ($lt -match "rajasthan") { return "Rajasthan" }
    if ($lt -match "uttar pradesh") { return "Uttar Pradesh" }
    if ($lt -match "chandigarh|jammu|kashmir|ladakh") { return "Union Territory" }
    return "Central"
}

# Load existing database
$db = [ordered]@{
    articles  = @()
    judgments = @()
    bareActs  = @()
}

if (Test-Path $DbFile) {
    try {
        $raw = Get-Content -Path $DbFile -Raw -Encoding UTF8
        if ($raw.Trim().Length -gt 0) {
            $parsed = $raw | ConvertFrom-Json
            if ($parsed.articles) { $db.articles = @($parsed.articles) }
            if ($parsed.judgments) { $db.judgments = @($parsed.judgments) }
            if ($parsed.bareActs) { $db.bareActs = @($parsed.bareActs) }
        }
    } catch {
        Write-Warning "Could not parse existing legalDatabase.json, starting fresh."
    }
}

$ExistingActMap = @{}
foreach ($act in $db.bareActs) {
    if ($act.id) { $ExistingActMap[$act.id] = $act }
    if ($act.title) { $ExistingActMap[$act.title.ToLower()] = $act }
}

Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host " PUNIA ASSOCIATES: INGESTING BARE ACTS INTO LIVE APP DB  " -ForegroundColor Yellow
Write-Host "==========================================================" -ForegroundColor Cyan

$TotalImported = 0

foreach ($folder in $SourceFolders) {
    if (-not (Test-Path $folder)) {
        Write-Warning "Folder not found: $folder"
        continue
    }

    $ResolvedPath = Resolve-Path $folder
    Write-Host "`nScanning source: $ResolvedPath" -ForegroundColor Green
    $PdfFiles = Get-ChildItem -Path $ResolvedPath -Filter "*.pdf" -File

    foreach ($file in $PdfFiles) {
        $fileName = $file.Name
        $fileBytes = [System.IO.File]::ReadAllBytes($file.FullName)
        $sha256 = (Get-FileHash -Path $file.FullName -Algorithm SHA256).Hash.ToLower()
        $sizeKb = [Math]::Round($file.Length / 1024, 2)

        # Clean title
        $base = [System.IO.Path]::GetFileNameWithoutExtension($fileName)
        $cleanTitle = $base -replace "_Punia_Associates_Reader_Edition", "" `
                            -replace "_Punia_Associates_Legal_Library", "" `
                            -replace "_", " "
        $cleanTitle = $cleanTitle.Trim()

        # Extract Year
        $year = 2024
        if ($cleanTitle -match '\b(1[89]\d\d|20\d\d)\b') {
            $year = [int]$matches[1]
        }

        # ID Slug
        $idSlug = "act-" + ($cleanTitle -replace '[^a-zA-Z0-9]+', '-').ToLower().Trim('-')
        $safeFileBase = ($cleanTitle -replace '[^a-zA-Z0-9]+', '_').ToLower().Trim('_')
        if ($safeFileBase.Length -gt 40) { $safeFileBase = $safeFileBase.Substring(0, 40) }
        $storedFileName = "${safeFileBase}_$($sha256.Substring(0, 8)).pdf"

        # 1. Copy PDF to live app storage
        $destPath = Join-Path $StoredPdfDir $storedFileName
        if (-not (Test-Path $destPath)) {
            [System.IO.File]::WriteAllBytes($destPath, $fileBytes)
        }

        # Also mirror to Antigravity project if present
        if (Test-Path $AntigravityStoredPdfDir) {
            $agDestPath = Join-Path $AntigravityStoredPdfDir $storedFileName
            if (-not (Test-Path $agDestPath)) {
                [System.IO.File]::WriteAllBytes($agDestPath, $fileBytes)
            }
        }

        $category = Get-AppCategory $cleanTitle
        $jurisdiction = Get-AppJurisdiction $cleanTitle

        $newAct = [ordered]@{
            id               = $idSlug
            title            = $cleanTitle
            shortTitle       = $cleanTitle
            actNumber        = "Act of $year"
            year             = $year
            enactmentDate    = "$year-01-01"
            enforcementDate  = "$year-01-01"
            ministry         = "Ministry of Law and Justice, Government of India"
            jurisdiction     = $jurisdiction
            category         = $category
            status           = "In Force"
            totalSections    = 50
            totalChapters    = 5
            preamble         = "Official consolidated Bare Act for $cleanTitle with statutory provisions."
            pdfUrl           = "/bare-acts/stored/$storedFileName"
            originalFileName = $fileName
            fileChecksum     = $sha256
            fileSizeKb       = $sizeKb
        }

        # Update or Add to Database
        if ($ExistingActMap.ContainsKey($idSlug)) {
            # Update
            $existing = $ExistingActMap[$idSlug]
            $existing.pdfUrl = "/bare-acts/stored/$storedFileName"
            $existing.fileChecksum = $sha256
            $existing.fileSizeKb = $sizeKb
        } else {
            $db.bareActs += $newAct
            $ExistingActMap[$idSlug] = $newAct
            $TotalImported++
        }

        Write-Host "  [+] Ingested: $cleanTitle -> /bare-acts/stored/$storedFileName" -ForegroundColor DarkGreen
    }
}

# Save updated database JSON
$jsonContent = $db | ConvertTo-Json -Depth 10
Set-Content -Path $DbFile -Value $jsonContent -Encoding UTF8

if (Test-Path $AntigravityProjectDir) {
    Set-Content -Path $AntigravityDbFile -Value $jsonContent -Encoding UTF8
}

Write-Host "`n==========================================================" -ForegroundColor Cyan
Write-Host "SUCCESS: Ingested $TotalImported new Bare Acts into App DB!" -ForegroundColor Green
Write-Host "Total Acts in Database: $($db.bareActs.Count)" -ForegroundColor White
Write-Host "Database File: $DbFile" -ForegroundColor White
Write-Host "Storage Directory: $StoredPdfDir" -ForegroundColor White
Write-Host "==========================================================" -ForegroundColor Cyan
