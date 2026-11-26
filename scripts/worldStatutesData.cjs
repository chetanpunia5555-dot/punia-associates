// Authoritative Statutory Corpus for Global World Law Library
// Curated & Typeset for Punia Associates World Legislation Platform

const worldStatutesCorpus = [
  // 1. UNITED STATES OF AMERICA
  {
    id: 'the-constitution-of-the-united-states',
    title: 'The Constitution of the United States of America',
    shortTitle: 'US Constitution & Bill of Rights',
    actNumber: 'Supreme Law of the United States (1787)',
    year: 1787,
    authority: 'Constitutional Convention & National Archives of the United States',
    jurisdiction: 'United States',
    category: 'Constitutional',
    preamble: 'We the People of the United States, in Order to form a more perfect Union, establish Justice, insure domestic Tranquility, provide for the common defence, promote the general Welfare, and secure the Blessings of Liberty to ourselves and our Posterity, do ordain and establish this Constitution for the United States of America.',
    sections: [
      { isChapterHeader: true, title: 'ARTICLE I — THE LEGISLATIVE BRANCH' },
      {
        sectionNumber: 'Section 1',
        title: 'Legislative Powers Vested in Congress',
        content: 'All legislative Powers herein granted shall be vested in a Congress of the United States, which shall consist of a Senate and House of Representatives.'
      },
      {
        sectionNumber: 'Section 2',
        title: 'House of Representatives — Composition, Qualifications & Apportionment',
        content: 'The House of Representatives shall be composed of Members chosen every second Year by the People of the several States, and the Electors in each State shall have the Qualifications requisite for Electors of the most numerous Branch of the State Legislature. No Person shall be a Representative who shall not have attained to the Age of twenty five Years, and been seven Years a Citizen of the United States, and who shall not, when elected, be an Inhabitant of that State in which he shall be chosen.'
      },
      {
        sectionNumber: 'Section 3',
        title: 'Senate — Equal Suffrage, Qualifications & Trial of Impeachments',
        content: 'The Senate of the United States shall be composed of two Senators from each State, chosen by the Legislature thereof (amended by the Seventeenth Amendment to direct popular election), for six Years; and each Senator shall have one Vote. The Senate shall have the sole Power to try all Impeachments. When sitting for that Purpose, they shall be on Oath or Affirmation. When the President of the United States is tried, the Chief Justice shall preside: And no Person shall be convicted without the Concurrence of two thirds of the Members present.'
      },
      {
        sectionNumber: 'Section 8',
        title: 'Enumerated Powers of Congress & Necessary and Proper Clause',
        content: 'The Congress shall have Power To lay and collect Taxes, Duties, Imposts and Excises, to pay the Debts and provide for the common Defence and general Welfare of the United States; To borrow Money on the credit of the United States; To regulate Commerce with foreign Nations, and among the several States, and with the Indian Tribes; To establish an uniform Rule of Naturalization, and uniform Laws on the subject of Bankruptcies throughout the United States; To coin Money, regulate the Value thereof, and of foreign Coin, and fix the Standard of Weights and Measures; To declare War, grant Letters of Marque and Reprisal, and make Rules concerning Captures on Land and Water; To raise and support Armies; To provide and maintain a Navy; And To make all Laws which shall be necessary and proper for carrying into Execution the foregoing Powers, and all other Powers vested by this Constitution in the Government of the United States, or in any Department or Officer thereof.'
      },
      { isChapterHeader: true, title: 'ARTICLE II — THE EXECUTIVE BRANCH' },
      {
        sectionNumber: 'Section 1',
        title: 'Executive Power, Presidential Term & Electoral College',
        content: 'The executive Power shall be vested in a President of the United States of America. He shall hold his Office during the Term of four Years, and, together with the Vice President, chosen for the same Term, be elected, as follows: Each State shall appoint, in such Manner as the Legislature thereof may direct, a Number of Electors, equal to the whole Number of Senators and Representatives to which the State may be entitled in the Congress.'
      },
      {
        sectionNumber: 'Section 2',
        title: 'Commander in Chief, Treaties & Appointments',
        content: 'The President shall be Commander in Chief of the Army and Navy of the United States, and of the Militia of the several States, when called into the actual Service of the United States; he may require the Opinion, in writing, of the principal Officer in each of the executive Departments, upon any Subject relating to the Duties of their respective Offices, and he shall have Power to grant Reprieves and Pardons for Offences against the United States, except in Cases of Impeachment. He shall have Power, by and with the Advice and Consent of the Senate, to make Treaties, provided two thirds of the Senators present concur.'
      },
      { isChapterHeader: true, title: 'ARTICLE III — THE JUDICIAL BRANCH' },
      {
        sectionNumber: 'Section 1',
        title: 'Judicial Power Vested in Supreme Court & Tenure During Good Behaviour',
        content: 'The judicial Power of the United States, shall be vested in one supreme Court, and in such inferior Courts as the Congress may from time to time ordain and establish. The Judges, both of the supreme and inferior Courts, shall hold their Offices during good Behaviour, and shall, at stated Times, receive for their Services, a Compensation, which shall not be diminished during their Continuance in Office.'
      },
      {
        sectionNumber: 'Section 2',
        title: 'Scope of Judicial Power, Original & Appellate Jurisdiction',
        content: 'The judicial Power shall extend to all Cases, in Law and Equity, arising under this Constitution, the Laws of the United States, and Treaties made, or which shall be made, under their Authority; to all Cases affecting Ambassadors, other public Ministers and Consuls; to all Cases of admiralty and maritime Jurisdiction; to Controversies to which the United States shall be a Party; to Controversies between two or more States; between a State and Citizens of another State; between Citizens of different States; between Citizens of the same State claiming Lands under Grants of different States, and between a State, or the Citizens thereof, and foreign States, Citizens or Subjects.'
      },
      { isChapterHeader: true, title: 'THE BILL OF RIGHTS & AMENDMENTS' },
      {
        sectionNumber: 'Amendment I',
        title: 'Freedom of Religion, Speech, Press, Assembly & Petition (1791)',
        content: 'Congress shall make no law respecting an establishment of religion, or prohibiting the free exercise thereof; or abridging the freedom of speech, or of the press; or the right of the people peaceably to assemble, and to petition the Government for a redress of grievances.'
      },
      {
        sectionNumber: 'Amendment IV',
        title: 'Search and Seizure, Warrants & Probable Cause (1791)',
        content: 'The right of the people to be secure in their persons, houses, papers, and effects, against unreasonable searches and seizures, shall not be violated, and no Warrants shall issue, but upon probable cause, supported by Oath or affirmation, and particularly describing the place to be searched, and the persons or things to be seized.'
      },
      {
        sectionNumber: 'Amendment V',
        title: 'Grand Jury Indictment, Double Jeopardy, Self-Incrimination, Due Process & Takings (1791)',
        content: 'No person shall be held to answer for a capital, or otherwise infamous crime, unless on a presentment or indictment of a Grand Jury; nor shall any person be subject for the same offence to be twice put in jeopardy of life or limb; nor shall be compelled in any criminal case to be a witness against himself, nor be deprived of life, liberty, or property, without due process of law; nor shall private property be taken for public use, without just compensation.'
      },
      {
        sectionNumber: 'Amendment XIV',
        title: 'Citizenship, Privileges or Immunities, Due Process & Equal Protection (1868)',
        content: 'All persons born or naturalized in the United States, and subject to the jurisdiction thereof, are citizens of the United States and of the State wherein they reside. No State shall make or enforce any law which shall abridge the privileges or immunities of citizens of the United States; nor shall any State deprive any person of life, liberty, or property, without due process of law; nor deny to any person within its jurisdiction the equal protection of the laws.'
      }
    ]
  },
  {
    id: 'us-uniform-commercial-code',
    title: 'Uniform Commercial Code (UCC)',
    shortTitle: 'Uniform Commercial Code',
    actNumber: 'Model Statutory Code (ALI & ULC)',
    year: 1952,
    authority: 'American Law Institute & Uniform Law Commission',
    jurisdiction: 'United States',
    category: 'Commercial & Corporate',
    preamble: 'An Act to simplify, clarify and modernize the law governing commercial transactions; to permit the continued expansion of commercial practices through custom, usage and agreement of the parties; and to make uniform the law among the various jurisdictions.',
    sections: [
      { isChapterHeader: true, title: 'ARTICLE 1 — GENERAL PROVISIONS' },
      {
        sectionNumber: 'Section 1-103',
        title: 'Construction of UCC to Promote Its Purposes and Policies',
        content: 'The Uniform Commercial Code must be liberally construed and applied to promote its underlying purposes and policies, which are: (1) to simplify, clarify, and modernize the law governing commercial transactions; (2) to permit the continued expansion of commercial practices through custom, usage, and agreement of the parties; and (3) to make uniform the law among the various jurisdictions. Unless displaced by the particular provisions of the UCC, the principles of law and equity, including the law merchant and the law relative to capacity to contract, principal and agent, estoppel, fraud, misrepresentation, duress, coercion, mistake, bankruptcy, and other validating or invalidating cause supplement its provisions.'
      },
      {
        sectionNumber: 'Section 1-304',
        title: 'Obligation of Good Faith',
        content: 'Every contract or duty within the Uniform Commercial Code imposes an obligation of good faith in its performance and enforcement. Good faith means honesty in fact and the observance of reasonable commercial standards of fair dealing.'
      },
      { isChapterHeader: true, title: 'ARTICLE 2 — SALES' },
      {
        sectionNumber: 'Section 2-201',
        title: 'Formal Requirements; Statute of Frauds',
        content: 'Except as otherwise provided in this section a contract for the sale of goods for the price of $500 or more is not enforceable by way of action or defense unless there is some writing sufficient to indicate that a contract for sale has been made between the parties and signed by the party against whom enforcement is sought or by his authorized agent or broker.'
      },
      {
        sectionNumber: 'Section 2-314',
        title: 'Implied Warranty: Merchantability; Usage of Trade',
        content: 'Unless excluded or modified, a warranty that the goods shall be merchantable is implied in a contract for their sale if the seller is a merchant with respect to goods of that kind. Under this section the serving for value of food or drink to be consumed either on the premises or elsewhere is a sale.'
      },
      {
        sectionNumber: 'Section 2-719',
        title: 'Contractual Modification or Limitation of Remedy',
        content: 'The agreement may provide for remedies in addition to or in substitution for those provided in this Article and may limit or alter the measure of damages recoverable under this Article, as by limiting the buyer\'s remedies to return of the goods and repayment of the price or to repair and replacement of non-conforming goods or parts.'
      }
    ]
  },
  {
    id: 'us-sherman-antitrust-act-1890',
    title: 'The Sherman Antitrust Act, 1890',
    shortTitle: 'Sherman Antitrust Act',
    actNumber: '26 Stat. 209 (15 U.S.C. §§ 1–7)',
    year: 1890,
    authority: 'United States Congress',
    jurisdiction: 'United States',
    category: 'Commercial & Corporate',
    preamble: 'An Act to protect trade and commerce against unlawful restraints and monopolies.',
    sections: [
      {
        sectionNumber: 'Section 1',
        title: 'Trusts, etc., in Restraint of Trade Illegal; Penalty',
        content: 'Every contract, combination in the form of trust or otherwise, or conspiracy, in restraint of trade or commerce among the several States, or with foreign nations, is declared to be illegal. Every person who shall make any contract or engage in any combination or conspiracy hereby declared to be illegal shall be deemed guilty of a felony, and, on conviction thereof, shall be punished by fine not exceeding $100,000,000 if a corporation, or, if any other person, $1,000,000, or by imprisonment not exceeding 10 years, or by both said punishments, in the discretion of the court.'
      },
      {
        sectionNumber: 'Section 2',
        title: 'Monopolizing Trade a Felony; Penalty',
        content: 'Every person who shall monopolize, or attempt to monopolize, or combine or conspire with any other person or persons, to monopolize any part of the trade or commerce among the several States, or with foreign nations, shall be deemed guilty of a felony, and, on conviction thereof, shall be punished by fine not exceeding $100,000,000 if a corporation, or, if any other person, $1,000,000, or by imprisonment not exceeding 10 years, or by both said punishments, in the discretion of the court.'
      },
      {
        sectionNumber: 'Section 7',
        title: '"Person" or "Persons" Defined',
        content: 'The word "person", or "persons", wherever used in this Act shall be deemed to include corporations and associations existing under or authorized by the laws of either the United States, the laws of any of the Territories, the laws of any State, or the laws of any foreign country.'
      }
    ]
  },

  // 2. UNITED KINGDOM (UK)
  {
    id: 'uk-magna-carta-1297',
    title: 'Magna Carta (The Great Charter of the Liberties of England), 1297',
    shortTitle: 'Magna Carta 1297',
    actNumber: '25 Edw. 1 (Statutes of the Realm)',
    year: 1297,
    authority: 'Parliament of England & The Crown',
    jurisdiction: 'United Kingdom',
    category: 'Constitutional',
    preamble: 'Edward by the grace of God King of England, Lord of Ireland, and Duke of Aquitaine, to all Archbishops, Bishops, and all others our faithful subjects, Greeting. We have granted to God, and by this our present Charter have confirmed, for Us and our Heirs for ever, that the Church of England shall be free, and shall have all her whole Rights and Liberties inviolable.',
    sections: [
      {
        sectionNumber: 'Clause XXIX (29)',
        title: 'Imprisonment, Outlawry & Due Process of Law',
        content: 'NO Freeman shall be taken or imprisoned, or be disseised of his Freehold, or Liberties, or free Customs, or be outlawed, or exiled, or any other wise destroyed; nor will We not pass upon him, nor condemn him, but by lawful judgment of his Peers, or by the Law of the Land. We will sell to no man, we will not deny or defer to any man either Justice or Right.'
      },
      {
        sectionNumber: 'Clause I (1)',
        title: 'Confirmation of Liberties of the Church and Kingdom',
        content: 'First, We have granted to God, and by this our present Charter have confirmed, for Us and our Heirs for ever, that the Church of England shall be free, and shall have all her whole Rights and Liberties inviolable. We have granted also, and given to all the Freemen of our Realm, for Us and our Heirs for ever, these Liberties underwritten, to have and to hold to them and their Heirs, of Us and our Heirs for ever.'
      },
      {
        sectionNumber: 'Clause IX (9)',
        title: 'Liberties of the City of London and Other Cities and Towns',
        content: 'THE City of London shall have all the old Liberties and Customs which it hath been used to have. Moreover, We will and grant, that all other Cities, Boroughs, Towns, and the Barons of the Five Ports, and all other Ports, shall have all their Liberties and free Customs.'
      }
    ]
  },
  {
    id: 'uk-companies-act-2006',
    title: 'Companies Act 2006 (United Kingdom)',
    shortTitle: 'UK Companies Act 2006',
    actNumber: '2006 c. 46 (Acts of the UK Parliament)',
    year: 2006,
    authority: 'Parliament of the United Kingdom',
    jurisdiction: 'United Kingdom',
    category: 'Commercial & Corporate',
    preamble: 'An Act to reform company law and restate the greater part of the enactments relating to companies; to make other provision relating to companies and other forms of business organisation; to make provision about directors\' disqualification, business names, auditors and actuaries; and for connected purposes.',
    sections: [
      { isChapterHeader: true, title: 'PART 10 — A COMPANY\'S DIRECTORS' },
      {
        sectionNumber: 'Section 171',
        title: 'Duty to Act Within Powers',
        content: 'A director of a company must— (a) act in accordance with the company\'s constitution, and (b) only exercise powers for the purposes for which they are conferred.'
      },
      {
        sectionNumber: 'Section 172',
        title: 'Duty to Promote the Success of the Company (Enlightened Shareholder Value)',
        content: 'A director of a company must act in the way he considers, in good faith, would be most likely to promote the success of the company for the benefit of its members as a whole, and in doing so have regard (amongst other matters) to— (a) the likely consequences of any decision in the long term, (b) the interests of the company\'s employees, (c) the need to foster the company\'s business relationships with suppliers, customers and others, (d) the impact of the company\'s operations on the community and the environment, (e) the desirability of the company maintaining a reputation for high standards of business conduct, and (f) the need to act fairly as between members of the company.'
      },
      {
        sectionNumber: 'Section 173',
        title: 'Duty to Exercise Independent Judgment',
        content: 'A director of a company must exercise independent judgment. This duty is not infringed by his acting— (a) in accordance with an agreement duly entered into by the company that restricts the future exercise of discretion by its directors, or (b) in a way authorised by the company\'s constitution.'
      },
      {
        sectionNumber: 'Section 174',
        title: 'Duty to Exercise Reasonable Care, Skill and Diligence',
        content: 'A director of a company must exercise reasonable care, skill and diligence. This means the care, skill and diligence that would be exercised by a reasonably diligent person with— (a) the general knowledge, skill and experience that may reasonably be expected of a person carrying out the functions carried out by the director in relation to the company, and (b) the general knowledge, skill and experience that the director has.'
      },
      {
        sectionNumber: 'Section 175',
        title: 'Duty to Avoid Conflicts of Interest',
        content: 'A director of a company must avoid a situation in which he has, or can have, a direct or indirect interest that conflicts, or possibly may conflict, with the interests of the company. This applies in particular to the exploitation of any property, information or opportunity (and it is immaterial whether the company could take advantage of the property, information or opportunity).'
      }
    ]
  },
  {
    id: 'uk-arbitration-act-1996',
    title: 'Arbitration Act 1996 (United Kingdom)',
    shortTitle: 'UK Arbitration Act 1996',
    actNumber: '1996 c. 23 (Acts of the UK Parliament)',
    year: 1996,
    authority: 'Parliament of the United Kingdom',
    jurisdiction: 'United Kingdom',
    category: 'Commercial & Corporate',
    preamble: 'An Act to restate and improve the law relating to arbitration pursuant to an arbitration agreement; to make other provision relating to arbitration and arbitration awards; and for connected purposes.',
    sections: [
      {
        sectionNumber: 'Section 1',
        title: 'General Principles of Arbitration',
        content: 'The provisions of this Part are founded on the following principles, and shall be construed accordingly: (a) the object of arbitration is to obtain the fair resolution of disputes by an impartial tribunal without unnecessary delay or expense; (b) the parties should be free to agree how their disputes are resolved, subject only to such safeguards as are necessary in the public interest; (c) in matters governed by this Part the court should not intervene except as provided by this Part.'
      },
      {
        sectionNumber: 'Section 5',
        title: 'Requirement for Arbitration Agreement to be in Writing',
        content: 'The provisions of this Part apply only where the arbitration agreement is in writing, and any other agreement between the parties as to any matter to be treated for the purposes of this Part as an agreement between the parties is effective only if it is in writing. An agreement is in writing— (a) if it is made in writing (whether or not it is signed by the parties), (b) if it is made by exchange of communications in writing, or (c) if it is evidenced in writing.'
      },
      {
        sectionNumber: 'Section 9',
        title: 'Stay of Legal Proceedings',
        content: 'A party to an arbitration agreement against whom legal proceedings are brought (whether by way of claim or counterclaim) in respect of a matter which under the agreement is to be referred to arbitration may (upon notice to the other parties to the proceedings) apply to the court in which the proceedings have been brought to stay the proceedings so far as they concern that matter.'
      },
      {
        sectionNumber: 'Section 33',
        title: 'General Duty of the Arbitral Tribunal',
        content: 'The tribunal shall— (a) act fairly and impartially as between the parties, giving each party a reasonable opportunity of putting his case and dealing with that of his opponent, and (b) adopt procedures suitable to the circumstances of the particular case, avoiding unnecessary delay or expense, so as to provide a fair means for the resolution of the matters falling to be determined.'
      }
    ]
  },

  // 3. SINGAPORE
  {
    id: 'singapore-penal-code-1871',
    title: 'Penal Code 1871 (Republic of Singapore)',
    shortTitle: 'Singapore Penal Code',
    actNumber: '1871 Rev. Ed. 2020 (Statutes of the Republic of Singapore)',
    year: 1871,
    authority: 'Parliament of Singapore & Attorney-General\'s Chambers',
    jurisdiction: 'Singapore',
    category: 'Criminal',
    preamble: 'An Act to consolidate and amend the law relating to criminal offences and their punishments in the Republic of Singapore.',
    sections: [
      { isChapterHeader: true, title: 'CHAPTER II — GENERAL EXPLANATIONS & JURISDICTION' },
      {
        sectionNumber: 'Section 2',
        title: 'Punishment of Offences Committed Within Singapore',
        content: 'Every person shall be liable to punishment under this Code and not otherwise for every act or omission contrary to the provisions thereof, of which he shall be guilty within Singapore.'
      },
      {
        sectionNumber: 'Section 3',
        title: 'Punishment of Offences Committed Beyond, But by Law Liable Within, Singapore',
        content: 'Any person liable, by any Singapore law, to be tried for an offence committed beyond the limits of Singapore, shall be dealt with according to the provisions of this Code, for any act committed beyond Singapore, in the same manner as if such act had been committed within Singapore.'
      },
      { isChapterHeader: true, title: 'CHAPTER IV — GENERAL EXCEPTIONS' },
      {
        sectionNumber: 'Section 76',
        title: 'Act Done by a Person Bound, or by Mistake of Fact Believing Himself Bound, by Law',
        content: 'Nothing is an offence which is done by a person who is, or who by reason of a mistake of fact and not by reason of a mistake of law in good faith believes himself to be, bound by law to do it.'
      },
      {
        sectionNumber: 'Section 96',
        title: 'Right of Private Defence',
        content: 'Nothing is an offence which is done in the exercise of the right of private defence. Every person has a right, subject to the restrictions contained in Section 99, to defend his own body, and the body of any other person, against any offence affecting the human body; and the property, whether movable or immovable, of himself or of any other person, against any act which is an offence falling under the definition of theft, robbery, mischief or criminal trespass, or which is an attempt to commit theft, robbery, mischief or criminal trespass.'
      },
      { isChapterHeader: true, title: 'OFFENCES AGAINST PROPERTY & FRAUD' },
      {
        sectionNumber: 'Section 378',
        title: 'Theft Defined',
        content: 'Whoever, intending to take dishonestly any movable property out of the possession of any person without that person\'s consent, moves that property in order to such taking, is said to commit theft.'
      },
      {
        sectionNumber: 'Section 415',
        title: 'Cheating Defined',
        content: 'Whoever, by deceiving any person, fraudulently or dishonestly induces the person so deceived to deliver any property to any person, or to consent that any person shall retain any property, or intentionally induces the person so deceived to do or omit to do anything which he would not do or omit if he were not so deceived, and which act or omission causes or is likely to cause damage or harm to that person in body, mind, reputation or property, is said to "cheat".'
      }
    ]
  },
  {
    id: 'singapore-companies-act-1967',
    title: 'Companies Act 1967 (Republic of Singapore)',
    shortTitle: 'Singapore Companies Act',
    actNumber: 'Cap. 50 (Statutes of the Republic of Singapore)',
    year: 1967,
    authority: 'Parliament of Singapore & Accounting and Corporate Regulatory Authority (ACRA)',
    jurisdiction: 'Singapore',
    category: 'Commercial & Corporate',
    preamble: 'An Act relating to companies and to provide for the incorporation, management, administration and winding up of companies in Singapore.',
    sections: [
      {
        sectionNumber: 'Section 157',
        title: 'As to the Duty and Liability of Officers',
        content: 'A director shall at all times act honestly and use reasonable diligence in the discharge of the duties of his office. An officer or agent of a company shall not make improper use of any information acquired by virtue of his position as an officer or agent of the company to gain, directly or indirectly, an advantage for himself or for any other person or to cause detriment to the company.'
      },
      {
        sectionNumber: 'Section 157A',
        title: 'Powers of Directors',
        content: 'The business of a company shall be managed by, or under the direction or supervision of, the directors. The directors may exercise all the powers of a company except any power that this Act or the constitution of the company requires the company to exercise in general meeting.'
      },
      {
        sectionNumber: 'Section 162',
        title: 'Loans to Directors Prohibited',
        content: 'A company shall not make a loan to a director of the company or of a related company, or enter into any guarantee or provide any security in connection with a loan made to such a director by any other person, except as authorized under this Act.'
      }
    ]
  },

  // 4. AUSTRALIA
  {
    id: 'australia-corporations-act-2001',
    title: 'Corporations Act 2001 (Commonwealth of Australia)',
    shortTitle: 'Australian Corporations Act',
    actNumber: 'Act No. 50 of 2001 (Federal Register of Legislation)',
    year: 2001,
    authority: 'Parliament of Australia & Australian Securities and Investments Commission (ASIC)',
    jurisdiction: 'Australia',
    category: 'Commercial & Corporate',
    preamble: 'An Act to make provision in relation to corporations and financial products and services, and for other purposes, under the referral of powers from the States of the Commonwealth of Australia.',
    sections: [
      { isChapterHeader: true, title: 'CHAPTER 2D — OFFICERS AND EMPLOYEES (DIRECTORS\' DUTIES)' },
      {
        sectionNumber: 'Section 180',
        title: 'Care and Diligence — Civil Obligation Only & Business Judgment Rule',
        content: 'A director or other officer of a corporation must exercise their powers and discharge their duties with the degree of care and diligence that a reasonable person would exercise if they: (a) were a director or officer of a corporation in the corporation\'s circumstances; and (b) occupied the office held by, and had the same responsibilities within the corporation as, the director or officer. Under the Business Judgment Rule (Section 180(2)), a director or officer who makes a business judgment is taken to meet the requirements of care and diligence if they make the judgment in good faith and for a proper purpose, do not have a material personal interest in the subject matter, inform themselves about the subject matter to the extent they reasonably believe to be appropriate, and rationally believe that the judgment is in the best interests of the corporation.'
      },
      {
        sectionNumber: 'Section 181',
        title: 'Good Faith — Civil Obligations',
        content: 'A director or other officer of a corporation must exercise their powers and discharge their duties: (a) in good faith in the best interests of the corporation; and (b) for a proper purpose.'
      },
      {
        sectionNumber: 'Section 182',
        title: 'Use of Position — Civil Obligations',
        content: 'A director, secretary, other officer or employee of a corporation must not improperly use their position to: (a) gain an advantage for themselves or someone else; or (b) cause detriment to the corporation.'
      },
      {
        sectionNumber: 'Section 183',
        title: 'Use of Information — Civil Obligations',
        content: 'A person who obtains information because they are, or have been, a director or other officer or employee of a corporation must not improperly use the information to: (a) gain an advantage for themselves or someone else; or (b) cause detriment to the corporation.'
      },
      {
        sectionNumber: 'Section 588G',
        title: 'Director\'s Duty to Prevent Insolvent Trading by Company',
        content: 'A person who is a director at the time when the company incurs a debt commits an offence or incurs civil penalty if the company is insolvent at that time, or becomes insolvent by incurring that debt, and there are reasonable grounds for suspecting that the company is insolvent, or would so become insolvent.'
      }
    ]
  },
  {
    id: 'commonwealth-of-australia-constitution-act-1900',
    title: 'Commonwealth of Australia Constitution Act, 1900',
    shortTitle: 'Australian Constitution',
    actNumber: '63 & 64 Vict. c. 12 (UK & Commonwealth Legislation)',
    year: 1900,
    authority: 'Parliament of the United Kingdom & High Court of Australia',
    jurisdiction: 'Australia',
    category: 'Constitutional',
    preamble: 'Whereas the people of New South Wales, Victoria, South Australia, Queensland, and Tasmania, humbly relying on the blessing of Almighty God, have agreed to unite in one indissoluble Federal Commonwealth under the Crown of the United Kingdom of Great Britain and Ireland, and under the Constitution hereby established.',
    sections: [
      {
        sectionNumber: 'Section 1',
        title: 'Legislative Power Vested in Federal Parliament',
        content: 'The legislative power of the Commonwealth shall be vested in a Federal Parliament, which shall consist of the Queen, a Senate, and a House of Representatives, and which is herein-after called The Parliament, or The Parliament of the Commonwealth.'
      },
      {
        sectionNumber: 'Section 51',
        title: 'Legislative Powers of the Parliament (Heads of Power)',
        content: 'The Parliament shall, subject to this Constitution, have power to make laws for the peace, order, and good government of the Commonwealth with respect to: (i) Trade and commerce with other countries, and among the States; (ii) Taxation; but so as not to discriminate between States or parts of States; (xx) Foreign corporations, and trading or financial corporations formed within the limits of the Commonwealth; (xxi) Marriage; (xxii) Divorce and matrimonial causes; (xxix) External affairs; (xxxi) The acquisition of property on just terms from any State or person for any purpose in respect of which the Parliament has power to make laws.'
      },
      {
        sectionNumber: 'Section 71',
        title: 'Judicial Power and Courts — The High Court of Australia',
        content: 'The judicial power of the Commonwealth shall be vested in a Federal Supreme Court, to be called the High Court of Australia, and in such other federal courts as the Parliament creates, and in such other courts as it invests with federal jurisdiction.'
      },
      {
        sectionNumber: 'Section 92',
        title: 'Trade Within the Commonwealth to be Absolutely Free',
        content: 'On the imposition of uniform duties of customs, trade, commerce, and intercourse among the States, whether by means of internal carriage or ocean navigation, shall be absolutely free.'
      },
      {
        sectionNumber: 'Section 109',
        title: 'Inconsistency of Laws',
        content: 'When a law of a State is inconsistent with a law of the Commonwealth, the latter shall prevail, and the former shall, to the extent of the inconsistency, be invalid.'
      }
    ]
  },

  // 5. GERMANY (DEUTSCHLAND)
  {
    id: 'german-basic-law-grundgesetz',
    title: 'Basic Law for the Federal Republic of Germany (Grundgesetz)',
    shortTitle: 'German Basic Law (Grundgesetz)',
    actNumber: 'Federal Law Gazette (BGBl.) p. 1 (1949)',
    year: 1949,
    authority: 'Parliamentary Council & Federal Constitutional Court of Germany',
    jurisdiction: 'Germany',
    category: 'Constitutional',
    preamble: 'Conscious of their responsibility before God and man, inspired by the determination to promote world peace as an equal partner in a united Europe, the German people, in the exercise of their constituent power, have adopted this Basic Law.',
    sections: [
      { isChapterHeader: true, title: 'I. BASIC RIGHTS (GRUNDRECHTE)' },
      {
        sectionNumber: 'Article 1',
        title: 'Human Dignity — Human Rights — Legally Binding Force of Basic Rights',
        content: '(1) Human dignity shall be inviolable. To respect and protect it shall be the duty of all state authority. (2) The German people therefore acknowledge inviolable and inalienable human rights as the basis of every community, of peace and of justice in the world. (3) The following basic rights shall bind the legislature, the executive and the judiciary as directly applicable law.'
      },
      {
        sectionNumber: 'Article 2',
        title: 'Personal Freedoms — Right to Life & Physical Integrity',
        content: '(1) Every person shall have the right to free development of his personality insofar as he does not violate the rights of others or offend against the constitutional order or the moral law. (2) Every person shall have the right to life and physical integrity. Freedom of the person shall be inviolable. These rights may be interfered with only pursuant to a law.'
      },
      {
        sectionNumber: 'Article 3',
        title: 'Equality Before the Law',
        content: '(1) All persons shall be equal before the law. (2) Men and women shall have equal rights. The state shall promote the actual implementation of equal rights for women and men and take steps to eliminate existing disadvantages. (3) No person shall be favoured or disfavoured because of sex, parentage, race, language, homeland and origin, faith or religious or political opinions. No person shall be disfavoured because of disability.'
      },
      {
        sectionNumber: 'Article 20',
        title: 'Constitutional Principles — Right of Resistance',
        content: '(1) The Federal Republic of Germany is a democratic and social federal state. (2) All state authority is derived from the people. It shall be exercised by the people through elections and other votes and through specific legislative, executive and judicial bodies. (3) The legislature shall be bound by the constitutional order, the executive and the judiciary by law and justice. (4) All Germans shall have the right to resist any person seeking to abolish this constitutional order, if no other remedy is available.'
      },
      {
        sectionNumber: 'Article 79(3)',
        title: 'The Eternity Clause (Ewigkeitsklausel)',
        content: 'Amendments to this Basic Law affecting the division of the Federation into Länder, their participation on principle in the legislative process, or the principles laid down in Articles 1 and 20 shall be inadmissible.'
      }
    ]
  },
  {
    id: 'german-civil-code-bgb',
    title: 'German Civil Code (Bürgerliches Gesetzbuch — BGB)',
    shortTitle: 'German Civil Code (BGB)',
    actNumber: 'Reichsgesetzblatt p. 195 (In Force 1 Jan 1900)',
    year: 1900,
    authority: 'Federal Ministry of Justice, Federal Republic of Germany',
    jurisdiction: 'Germany',
    category: 'Civil',
    preamble: 'The comprehensive codification of private law in the Federal Republic of Germany, governing legal transactions, obligations, law of property, family law, and succession.',
    sections: [
      { isChapterHeader: true, title: 'BOOK 1 — GENERAL PART (ALLGEMEINER TEIL)' },
      {
        sectionNumber: 'Section 1',
        title: 'Beginning of Legal Capacity',
        content: 'The legal capacity of a human being begins on the completion of birth.'
      },
      {
        sectionNumber: 'Section 138',
        title: 'Legal Transaction Contrary to Public Policy; Usury',
        content: '(1) A legal transaction which is contrary to public policy (gute Sitten) is void. (2) In particular, a legal transaction is void by which a person, by exploiting the predicament, inexperience, lack of sound judgment or considerable weakness of will of another, causes himself or a third party, in exchange for an act of performance, to be promised or granted pecuniary advantages which are clearly disproportionate to the performance.'
      },
      {
        sectionNumber: 'Section 242',
        title: 'Performance in Good Faith (Treu und Glauben)',
        content: 'An obligor has a duty to perform according to the requirements of good faith, taking customary practice into consideration (Treu und Glauben mit Rücksicht auf die Verkehrssitte).'
      },
      { isChapterHeader: true, title: 'BOOK 2 — LAW OF OBLIGATIONS (RECHT DER SCHULDVERHÄLTNISSE)' },
      {
        sectionNumber: 'Section 280',
        title: 'Damages for Breach of Duty',
        content: '(1) If the obligor breaches a duty arising from the obligation, the obligee may demand damages for the damage caused thereby. This does not apply if the obligor is not responsible for the breach of duty.'
      },
      {
        sectionNumber: 'Section 823',
        title: 'Liability in Damages for Torts (Deliktsrecht)',
        content: '(1) A person who, intentionally or negligently, unlawfully injures the life, body, health, freedom, property or other right of another person is liable to make compensation to the other person for the damage arising from this. (2) The same duty is held by a person who commits a breach of a statute that is intended to protect another person.'
      }
    ]
  },

  // 6. FRANCE
  {
    id: 'french-civil-code-napoleon',
    title: 'French Civil Code (Code Civil des Français / Code Napoléon)',
    shortTitle: 'French Civil Code',
    actNumber: 'Promulgated 21 March 1804 (Journal Officiel)',
    year: 1804,
    authority: 'Government of the French Republic & Légifrance',
    jurisdiction: 'France',
    category: 'Civil',
    preamble: 'The foundational civil law codification of France, establishing equality before the law, freedom of contract, and the inviolability of civil rights and property.',
    sections: [
      { isChapterHeader: true, title: 'PRELIMINARY TITLE — OF THE PUBLICATION, EFFECTS AND APPLICATION OF LAWS' },
      {
        sectionNumber: 'Article 1',
        title: 'Promulgation and Entry into Force of Laws',
        content: 'Laws and administrative acts, after their publication in the Journal Officiel de la République Française, enter into force on the date which they fix or, failing this, on the day after their publication.'
      },
      {
        sectionNumber: 'Article 2',
        title: 'Principle of Non-Retroactivity of Laws',
        content: 'Legislation provides only for the future; it has no retroactive effect (La loi ne dispose que pour l\'avenir; elle n\'a point d\'effet rétroactif).'
      },
      { isChapterHeader: true, title: 'BOOK III — CONTRACTS AND GENERAL LAW OF OBLIGATIONS' },
      {
        sectionNumber: 'Article 1101',
        title: 'Contract Defined',
        content: 'A contract is an agreement of wills by which one or several persons obligate themselves to one or several others to give, to do, or not to do something.'
      },
      {
        sectionNumber: 'Article 1104',
        title: 'Good Faith in Negotiation, Formation and Performance',
        content: 'Contracts must be negotiated, formed and performed in good faith. This provision is a matter of public policy (Les contrats doivent être négociés, formés et exécutés de bonne foi. Cette disposition est d\'ordre public).'
      },
      {
        sectionNumber: 'Article 1240',
        title: 'General Tort Liability (Former Article 1382)',
        content: 'Any act whatever of man, which causes damage to another, obliges him by whose fault it occurred to repair it (Tout fait quelconque de l\'homme, qui cause à autrui un dommage, oblige celui par la faute duquel il est arrivé à le réparer).'
      },
      {
        sectionNumber: 'Article 1241',
        title: 'Liability for Negligence and Imprudence',
        content: 'Everyone is liable for the damage he causes not only by his intentional act, but also by his negligence or by his imprudence.'
      }
    ]
  },

  // 7. CANADA
  {
    id: 'canada-constitution-and-charter-of-rights',
    title: 'Constitution Acts 1867 to 1982 & Canadian Charter of Rights and Freedoms',
    shortTitle: 'Canadian Constitution & Charter of Rights',
    actNumber: 'Constitution Act, 1982 (Schedule B to Canada Act 1982 (UK))',
    year: 1982,
    authority: 'Parliament of Canada & Supreme Court of Canada',
    jurisdiction: 'Canada',
    category: 'Constitutional',
    preamble: 'Whereas Canada is founded upon principles that recognize the supremacy of God and the rule of law.',
    sections: [
      { isChapterHeader: true, title: 'CANADIAN CHARTER OF RIGHTS AND FREEDOMS' },
      {
        sectionNumber: 'Section 1',
        title: 'Guarantee of Rights and Reasonable Limits (Oakes Test)',
        content: 'The Canadian Charter of Rights and Freedoms guarantees the rights and freedoms set out in it subject only to such reasonable limits prescribed by law as can be demonstrably justified in a free and democratic society.'
      },
      {
        sectionNumber: 'Section 2',
        title: 'Fundamental Freedoms',
        content: 'Everyone has the following fundamental freedoms: (a) freedom of conscience and religion; (b) freedom of thought, belief, opinion and expression, including freedom of the press and other media of communication; (c) freedom of peaceful assembly; and (d) freedom of association.'
      },
      {
        sectionNumber: 'Section 7',
        title: 'Life, Liberty and Security of the Person & Principles of Fundamental Justice',
        content: 'Everyone has the right to life, liberty and security of the person and the right not to be deprived thereof except in accordance with the principles of fundamental justice.'
      },
      {
        sectionNumber: 'Section 15',
        title: 'Equality Before and Under Law and Equal Protection and Benefit of Law',
        content: 'Every individual is equal before and under the law and has the right to the equal protection and equal benefit of the law without discrimination and, in particular, without discrimination based on race, national or ethnic origin, colour, religion, sex, age or mental or physical disability.'
      },
      {
        sectionNumber: 'Section 33',
        title: 'The Notwithstanding Clause (Parliamentary Sovereignty)',
        content: 'Parliament or the legislature of a province may expressly declare in an Act of Parliament or of the legislature, as the case may be, that the Act or a provision thereof shall operate notwithstanding a provision included in section 2 or sections 7 to 15 of this Charter.'
      },
      {
        sectionNumber: 'Section 52',
        title: 'Supremacy of Constitution of Canada',
        content: 'The Constitution of Canada is the supreme law of Canada, and any law that is inconsistent with the provisions of the Constitution is, to the extent of the inconsistency, of no force or effect.'
      }
    ]
  },

  // 8. INTERNATIONAL CONVENTIONS & MULTILATERAL TREATIES
  {
    id: 'un-universal-declaration-of-human-rights-udhr',
    title: 'Universal Declaration of Human Rights (UDHR)',
    shortTitle: 'Universal Declaration of Human Rights',
    actNumber: 'UN General Assembly Resolution 217 A (III)',
    year: 1948,
    authority: 'United Nations General Assembly',
    jurisdiction: 'International',
    category: 'Constitutional',
    preamble: 'Whereas recognition of the inherent dignity and of the equal and inalienable rights of all members of the human family is the foundation of freedom, justice and peace in the world... Now, Therefore THE GENERAL ASSEMBLY proclaims THIS UNIVERSAL DECLARATION OF HUMAN RIGHTS as a common standard of achievement for all peoples and all nations.',
    sections: [
      {
        sectionNumber: 'Article 1',
        title: 'Right to Equality and Brotherhood',
        content: 'All human beings are born free and equal in dignity and rights. They are endowed with reason and conscience and should act towards one another in a spirit of brotherhood.'
      },
      {
        sectionNumber: 'Article 3',
        title: 'Right to Life, Liberty and Security',
        content: 'Everyone has the right to life, liberty and security of person.'
      },
      {
        sectionNumber: 'Article 5',
        title: 'Prohibition of Torture and Inhumane Treatment',
        content: 'No one shall be subjected to torture or to cruel, inhuman or degrading treatment or punishment.'
      },
      {
        sectionNumber: 'Article 7',
        title: 'Equality Before the Law',
        content: 'All are equal before the law and are entitled without any discrimination to equal protection of the law. All are entitled to equal protection against any discrimination in violation of this Declaration and against any incitement to such discrimination.'
      },
      {
        sectionNumber: 'Article 10',
        title: 'Right to Fair and Public Hearing by Independent and Impartial Tribunal',
        content: 'Everyone is entitled in full equality to a fair and public hearing by an independent and impartial tribunal, in the determination of his rights and obligations and of any criminal charge against him.'
      },
      {
        sectionNumber: 'Article 19',
        title: 'Freedom of Opinion and Expression',
        content: 'Everyone has the right to freedom of opinion and expression; this right includes freedom to hold opinions without interference and to seek, receive and impart information and ideas through any media and regardless of frontiers.'
      }
    ]
  },
  {
    id: 'new-york-arbitration-convention-1958',
    title: 'Convention on the Recognition and Enforcement of Foreign Arbitral Awards (The New York Convention)',
    shortTitle: 'New York Arbitration Convention',
    actNumber: '330 U.N.T.S. 3 (United Nations Treaty Series)',
    year: 1958,
    authority: 'United Nations Commission on International Trade Law (UNCITRAL)',
    jurisdiction: 'International',
    category: 'Commercial & Corporate',
    preamble: 'The Contracting States, seeking to encourage the recognition and enforcement of commercial arbitration agreements in international contracts and to unify the rules by which foreign arbitral awards are recognized and enforced in domestic jurisdictions.',
    sections: [
      {
        sectionNumber: 'Article I',
        title: 'Scope of Application',
        content: 'This Convention shall apply to the recognition and enforcement of arbitral awards made in the territory of a State other than the State where the recognition and enforcement of such awards are sought, and arising out of differences between persons, whether physical or legal. It shall also apply to arbitral awards not considered as domestic awards in the State where their recognition and enforcement are sought.'
      },
      {
        sectionNumber: 'Article II',
        title: 'Recognition of Arbitration Agreements in Writing',
        content: 'Each Contracting State shall recognize an agreement in writing under which the parties undertake to submit to arbitration all or any differences which have arisen or which may arise between them in respect of a defined legal relationship, whether contractual or not, concerning a subject matter capable of settlement by arbitration. The court of a Contracting State, when seized of an action in a matter in respect of which the parties have made an agreement within the meaning of this article, shall, at the request of one of the parties, refer the parties to arbitration, unless it finds that the said agreement is null and void, inoperative or incapable of being performed.'
      },
      {
        sectionNumber: 'Article V',
        title: 'Grounds for Refusal of Recognition and Enforcement of Foreign Arbitral Awards',
        content: 'Recognition and enforcement of the award may be refused, at the request of the party against whom it is invoked, only if that party furnishes to the competent authority proof that: (a) The parties were under some incapacity, or the agreement is not valid under the governing law; (b) The party was not given proper notice of the appointment of the arbitrator or of the arbitration proceedings; (c) The award deals with a difference not contemplated by or not falling within the terms of the submission to arbitration; (d) The composition of the arbitral authority or the arbitral procedure was not in accordance with the agreement of the parties; or (e) The award has not yet become binding on the parties, or has been set aside or suspended by a competent authority. Recognition and enforcement may also be refused if the competent authority finds that: (a) The subject matter of the dispute is not capable of settlement by arbitration under the law of that State; or (b) The recognition or enforcement of the award would be contrary to the public policy of that State.'
      }
    ]
  },
  {
    id: 'uncitral-model-law-arbitration',
    title: 'UNCITRAL Model Law on International Commercial Arbitration (1985 with Amendments as Adopted in 2006)',
    shortTitle: 'UNCITRAL Model Law on Arbitration',
    actNumber: 'United Nations Document A/40/17, Annex I',
    year: 1985,
    authority: 'United Nations Commission on International Trade Law (UNCITRAL)',
    jurisdiction: 'International',
    category: 'Commercial & Corporate',
    preamble: 'A global benchmark model law designed to assist States in reforming and modernizing their laws on arbitral procedure so as to take into account the particular features and needs of international commercial arbitration.',
    sections: [
      {
        sectionNumber: 'Article 5',
        title: 'Extent of Court Intervention',
        content: 'In matters governed by this Law, no court shall intervene except where so provided in this Law.'
      },
      {
        sectionNumber: 'Article 16',
        title: 'Competence of Arbitral Tribunal to Rule on Its Jurisdiction (Kompetenz-Kompetenz)',
        content: 'The arbitral tribunal may rule on its own jurisdiction, including any objections with respect to the existence or validity of the arbitration agreement. For that purpose, an arbitration clause which forms part of a contract shall be treated as an agreement independent of the other terms of the contract. A decision by the arbitral tribunal that the contract is null and void shall not entail ipso jure the invalidity of the arbitration clause.'
      },
      {
        sectionNumber: 'Article 18',
        title: 'Equal Treatment of Parties',
        content: 'The parties shall be treated with equality and each party shall be given a full opportunity of presenting his case.'
      },
      {
        sectionNumber: 'Article 34',
        title: 'Application for Setting Aside as Exclusive Recourse Against Arbitral Award',
        content: 'Recourse to a court against an arbitral award may be made only by an application for setting aside in accordance with paragraphs (2) and (3) of this article. An arbitral award may be set aside by the court specified in article 6 only if the applicant furnishes proof of grounds established in this Article or if the court finds that the award is in conflict with the public policy of this State.'
      }
    ]
  },
  {
    id: 'un-charter-and-icj-statute',
    title: 'Charter of the United Nations and Statute of the International Court of Justice',
    shortTitle: 'Charter of the United Nations',
    actNumber: '1 UNTS XVI (Signed 26 June 1945 at San Francisco)',
    year: 1945,
    authority: 'United Nations & International Court of Justice (ICJ)',
    jurisdiction: 'International',
    category: 'Constitutional',
    preamble: 'WE THE PEOPLES OF THE UNITED NATIONS DETERMINED to save succeeding generations from the scourge of war, which twice in our lifetime has brought untold sorrow to mankind, and to reaffirm faith in fundamental human rights, in the dignity and worth of the human person, in the equal rights of men and women and of nations large and small, and to establish conditions under which justice and respect for the obligations arising from treaties and other sources of international law can be maintained, and to promote social progress and better standards of life in larger freedom, HAVE RESOLVED TO COMBINE OUR EFFORTS TO ACCOMPLISH THESE AIMS.',
    sections: [
      { isChapterHeader: true, title: 'CHAPTER I — PURPOSES AND PRINCIPLES' },
      {
        sectionNumber: 'Article 1',
        title: 'Purposes of the United Nations',
        content: 'The Purposes of the United Nations are: 1. To maintain international peace and security, and to that end: to take effective collective measures for the prevention and removal of threats to the peace, and for the suppression of acts of aggression or other breaches of the peace, and to bring about by peaceful means, and in conformity with the principles of justice and international law, adjustment or settlement of international disputes or situations which might lead to a breach of the peace; 2. To develop friendly relations among nations based on respect for the principle of equal rights and self-determination of peoples, and to take other appropriate measures to strengthen universal peace; 3. To achieve international co-operation in solving international problems of an economic, social, cultural, or humanitarian character, and in promoting and encouraging respect for human rights and for fundamental freedoms for all without distinction as to race, sex, language, or religion; and 4. To be a centre for harmonizing the actions of nations in the attainment of these common ends.'
      },
      {
        sectionNumber: 'Article 2',
        title: 'Principles of Sovereign Equality & Prohibition of the Threat or Use of Force',
        content: 'The Organization and its Members, in pursuit of the Purposes stated in Article 1, shall act in accordance with the following Principles: 1. The Organization is based on the principle of the sovereign equality of all its Members. 2. All Members, in order to ensure to all of them the rights and benefits resulting from membership, shall fulfil in good faith the obligations assumed by them in accordance with the present Charter. 3. All Members shall settle their international disputes by peaceful means in such a manner that international peace and security, and justice, are not endangered. 4. All Members shall refrain in their international relations from the threat or use of force against the territorial integrity or political independence of any state, or in any other manner inconsistent with the Purposes of the United Nations.'
      },
      {
        sectionNumber: 'Article 51',
        title: 'Inherent Right of Individual or Collective Self-Defence',
        content: 'Nothing in the present Charter shall impair the inherent right of individual or collective self-defence if an armed attack occurs against a Member of the United Nations, until the Security Council has taken measures necessary to maintain international peace and security. Measures taken by Members in the exercise of this right of self-defence shall be immediately reported to the Security Council and shall not in any way affect the authority and responsibility of the Security Council under the present Charter to take at any time such action as it deems necessary in order to maintain or restore international peace and security.'
      }
    ]
  }
];

module.exports = { worldStatutesCorpus };
