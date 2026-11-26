# PUNIA ASSOCIATES - BARE ACTS BULK INGESTION & DOWNLOAD MANAGER
# Native PowerShell script - No external dependencies required

param(
    [string[]]$SourceFolders = @("..\puniaassociates bareacts 1", "..\puniaassociates bare acts 2"),
    [string]$PublicDownloadUrlPrefix = "/downloads/bare_acts/"
)

$ErrorActionPreference = "Stop"
$Workspace = Get-Location
$PublicDownloadsDir = Join-Path $Workspace "public_downloads\bare_acts"
$OutputDir = Join-Path $Workspace "catalog_output"

if (-not (Test-Path $PublicDownloadsDir)) {
    New-Item -ItemType Directory -Path $PublicDownloadsDir -Force | Out-Null
}
if (-not (Test-Path $OutputDir)) {
    New-Item -ItemType Directory -Path $OutputDir -Force | Out-Null
}

$CategoryMap = @{
    "criminal"    = "Criminal & Procedural Law"
    "penal"       = "Criminal & Procedural Law"
    "police"      = "Criminal & Procedural Law"
    "procedure"   = "Criminal & Procedural Law"
    "evidence"    = "Evidence & Procedural Law"
    "civil"       = "Civil & Limitation Law"
    "contract"    = "Commercial & Contract Law"
    "property"    = "Property & Real Estate Law"
    "marriage"    = "Family & Personal Law"
    "succession"  = "Family & Personal Law"
    "company"     = "Corporate & Banking Law"
    "companies"   = "Corporate & Banking Law"
    "insolvency"  = "Corporate & Banking Law"
    "arbitration" = "Arbitration & Commercial Law"
    "tax"         = "Taxation & Revenue Law"
    "gst"         = "Taxation & Revenue Law"
    "constitution"= "Constitutional Law"
    "labour"      = "Labour & Employment Law"
    "remuneration"= "Labour & Employment Law"
    "provident"   = "Labour & Employment Law"
    "insurance"   = "Labour & Employment Law"
    "environment" = "Environment & Human Rights Law"
    "information" = "IT & Data Protection Law"
    "copyright"   = "Intellectual Property Law"
    "court"       = "Judicial Administration & Court Laws"
    "tribunal"    = "Judicial Administration & Court Laws"
}

$Records = @()
$Seen = @{}

Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host "  PUNIA ASSOCIATES: BARE ACTS BULK INGESTION ENGINE       " -ForegroundColor Yellow
Write-Host "==========================================================" -ForegroundColor Cyan

foreach ($folder in $SourceFolders) {
    if (-not (Test-Path $folder)) {
        Write-Warning "Source folder not found: $folder"
        continue
    }

    $ResolvedPath = Resolve-Path $folder
    Write-Host "`nScanning folder: $ResolvedPath" -ForegroundColor Green
    $PdfFiles = Get-ChildItem -Path $ResolvedPath -Filter "*.pdf" -File

    Write-Host "Found $($PdfFiles.Count) PDF files." -ForegroundColor Gray

    foreach ($file in $PdfFiles) {
        $fileName = $file.Name
        if ($Seen.ContainsKey($fileName)) {
            continue
        }
        $Seen[$fileName] = $true

        # Clean title
        $base = [System.IO.Path]::GetFileNameWithoutExtension($fileName)
        $cleanTitle = $base -replace "_Punia_Associates_Reader_Edition", "" `
                            -replace "_Punia_Associates_Legal_Library", "" `
                            -replace "_", " "
        $cleanTitle = $cleanTitle.Trim()

        # Extract Year
        $year = "N/A"
        if ($cleanTitle -match '\b(1[89]\d\d|20\d\d)\b') {
            $year = $matches[1]
        }

        # Jurisdiction
        $jurisdiction = "Central"
        $states = @("Delhi", "Haryana", "Punjab", "Rajasthan", "Maharashtra", "Uttar Pradesh")
        foreach ($st in $states) {
            if ($cleanTitle -match $st) {
                $jurisdiction = $st
                break
            }
        }

        # Category
        $category = "General Central Legislation"
        $lowerTitle = $cleanTitle.ToLower()
        foreach ($key in $CategoryMap.Keys) {
            if ($lowerTitle -match $key) {
                $category = $CategoryMap[$key]
                break
            }
        }

        # Checksum & Size
        $fileBytes = [System.IO.File]::ReadAllBytes($file.FullName)
        $sha256 = (Get-FileHash -Path $file.FullName -Algorithm SHA256).Hash.ToLower()
        $sizeKb = [Math]::Round($file.Length / 1024, 2)

        # Copy to public download folder
        $targetFile = Join-Path $PublicDownloadsDir $fileName
        if (-not (Test-Path $targetFile)) {
            Copy-Item -Path $file.FullName -Destination $targetFile -Force
        }

        # Record ID
        $slug = ($cleanTitle -replace '[^a-zA-Z0-9]+', '-').ToLower().Trim('-')

        $record = [PSCustomObject]@{
            id              = $slug
            title           = $cleanTitle
            short_title     = $cleanTitle
            year            = $year
            jurisdiction    = $jurisdiction
            category        = $category
            file_name       = $fileName
            file_size_kb    = $sizeKb
            sha256          = $sha256
            format          = "PDF"
            status          = "IN_FORCE"
            download_url    = "$PublicDownloadUrlPrefix$fileName"
            description     = "Official Bare Act for $cleanTitle with latest statutory provisions."
        }

        $Records += $record
        Write-Host "  -> Processed: $cleanTitle ($sizeKb KB)" -ForegroundColor DarkGreen
    }
}

# Sort by Title
$Records = $Records | Sort-Object title

# Export JSON
$JsonPath = Join-Path $OutputDir "bare_acts_catalog.json"
$CatalogObj = [PSCustomObject]@{
    total_acts = $Records.Count
    generated_at = (Get-Date).ToString("yyyy-MM-ddTHH:mm:sszzz")
    acts = $Records
}
$CatalogObj | ConvertTo-Json -Depth 5 | Set-Content -Path $JsonPath -Encoding UTF8

# Export CSV
$CsvPath = Join-Path $OutputDir "bare_acts_catalog.csv"
$Records | Export-Csv -Path $CsvPath -NoTypeInformation -Encoding UTF8

Write-Host "`n==========================================================" -ForegroundColor Cyan
Write-Host "SUCCESS: Processed $($Records.Count) Bare Acts." -ForegroundColor Green
Write-Host "1. JSON Catalog : $JsonPath" -ForegroundColor White
Write-Host "2. CSV Catalog  : $CsvPath" -ForegroundColor White
Write-Host "3. Downloads Dir: $PublicDownloadsDir" -ForegroundColor White
Write-Host "==========================================================" -ForegroundColor Cyan
