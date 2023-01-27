// Copyright 2023, Adonis Pujols, All rights reserved.

/*     *** GAME CONSTANTS ***     */
/*
    THESE CAN BE ADJUSTED FREELY
*/
// (keeping as let variables to edit during debugging)
// initial starting year
let START_YEAR = 1066;
// initial soldiers of kingdom
let INITIAL_PLAYER_SOLDIERS = 1000;
// provinces required to level up to Duke, King, or Emperor (events can adjust this)
let REQUIRED_PROVINCES_DUKE = 5;
let REQUIRED_PROVINCES_KING = 9;
let REQUIRED_PROVINCES_EMPEROR = 13;
// starting age of ruler
let INITIAL_RULER_AGE = 40;
// initial skill level of ruler
let INITIAL_RULER_SKILL_LEVEL = 2;
// max skill level that you can educate a child (other than renowed teacher event)
let MAX_SKILL_LEVEL = 5;
// max age you can live (die when you reach max age)
let MAX_AGE = 101;
// min age you have to be to start dying of old age
let MIN_AGING_YEAR = 60;
// min age to be to try to assassinate someone
let MIN_ASSASSIN_AGE = 16;
// max soliers to lose from disease
let MAX_SOLDIERS_LOST_DISEASE = 300;
// min soliers to lose from disease
let MIN_SOLDIERS_LOST_DISEASE =  150;
// max soliers lost or gained from betrayal
let MAX_SOLDIERS_BETRAY = 300;
// min soliers lost or gained from betrayal
let MIN_SOLDIERS_BETRAY =  150;
// what max percentage of soldiers can defect from event (if random num was greater than total soldiers owned)
let MAX_SOLDIERS_BETRAY_PERCENTAGE =  0.5;
// what closest multiple (like 50) will soldiers be rounded to in disease, betrayal, etc
// if 50, then it's 100, 150, 200 etc. if 10 it's 110,120,130. if 1 then 111,112,113, etc.
let SOLDIERS_EVENT_MULTIPLE =  50;
let MAX_PROVINCE_SOLDIERS = 750;
let MIN_PROVINCE_SOLDIERS =  600;
let MAX_STARTING_PROVINCE_OPINION =  20;
// let SOLDIERS_EVENT_MULTIPLE =  50;
// highest age you can educate a child
let MAX_EDUCATE_AGE =  20;
// opinion loss from attacking a nation/provinces
let OPINION_LOSS_ATTACK = -50;
// opinion gain from marriage
let OPINION_GAIN_MARRIAGE = 10;
// must have at least this much opinion to get province to become a vassal
let OPINION_REQUIRED_VASSAL = 90;
// every soldier you have greater than enemy province adds opinion * multiplier
let GREATER_STRENGTH_OPINION_MULTIPLIER = 0.05;
// default soldiers for all nonplayer provinces
let DEFAULT_PROVINCE_SOLDIERS = 750;
// percentage of total soldiers that rebel forces will have
let REBELLION_STRENGTH_PERCENTAGE = 0.40;
// amount of soldiers trained from button
let SOLDIERS_TRAIN_AMOUNT = 100;
// must be at least this age (16) to give bith if married
let MIN_AGE_BIRTH = 16;
// chance (from 0 to 1) of birthing a child
let BIRTH_CHANCE = 0.5;
// max percentage of soldiers to lose from crusades
let CRUSADE_MAX_LOSS_PERCENTAGE = 0.50;
// mininum total rolls to rank up as count from crusade event
let CRUSADE_ROLL_COUNT = 600;
// mininum total rolls to rank up as duke from crusade event
let CRUSADE_ROLL_DUKE =  800;
// mininum total rolls to rank up as king from crusade event
let CRUSADE_ROLL_KING = 1000;
// strength of rando menemy invasion (percentage of initial soldier amount). set to half for now
let ENEMY_INVASION_STRENGTH_RATIO = 0.40;
// CHANCES OF EVENTS HAPPENING:
let DEATH_BY_ACCIDENT_EVENT_CHANCE = 0.1;  // dying to accident
let SOLDIERS_BETRAY_EVENT_CHANCE = 0.1;  // soldiers betray you and join someone else
let SOLDIERS_DEFECT_EVENT_CHANCE = 0.1;  // soldiers defect to your cause
let ENEMY_ATTACK_EVENT_CHANCE = 0.1;     // enemy invasion
let REBELLION_EVENT_CHANCE = 0.1;
let RENOWED_TEACHER_EVENT_CHANCE = 0.1;
let CRUSADE_EVENT_CHANCE = 0.05;
let DISEASE_KILLS_MEMBER_EVENT_CHANCE = 0.1;    // family member dies to disease
let DISEASE_KILLS_SOLDIERS_EVENT_CHANCE = 0.1;
let ASSASSINATION_BY_MEMBER_EVENT_CHANCE = 0.1;   // family member assassinates someone
let ASSASSINATION_BY_DYNASTY_EVENT_CHANCE = 0.1;
let FAILED_ASSASSINATION_EVENT_CHANCE = 0.1;
let DEATH_SOLDIERS_HYGIENE_EVENT_CHANCE = 0.1;   // soldiers dying from bad hygiene

// TODO implement laser guided llamas for X Faction

/*
    IF NOT DEVELOPER, DO NOT ADJUST THESE FOLLOWING CONSTANTS. WILL BREAK GAME!
*/
// initial default starting region
const DEFAULT_STARTING_REGION = "Baden";
const DEFAULT_ICON_CHOICE = "king_1_choice";
const EDUCATE_CHILD_CONDITION = "educateChild";
const ARRANGE_MARRIAGE_CONDITION = "arrangeMarriage";
const CHANGE_HEIR_CONDITION = "changeHeir";
const CHANGE_RULER_CONDITION = "changeRuler";
const RENOWED_TEACHER_CONDITION = "renowedTeacher";
const VIEW_FAMILY_TREE_CONDITION = "viewFamilyTree";

// *** GAME VARIABLES  ***
let initialRulerName = "";
let currentRuler;
let currentHeir;
// 1=Count, 2=Duke, 3=King/Queen, 4=Emperor (game won)
let dynastyRank = 1;
let currentYear = START_YEAR;
let playerSoldiers = INITIAL_PLAYER_SOLDIERS;
let actionsTaken = 0;

// incrementing unique id for all new characters
let uniqueId = 0;
// map of all provinces owned (province id : region)
// on every control swap, change provincesOwned and regions map
let provincesOwned = {};

let playerCountry = {
    name : "",
    flagUrl: "",
    opinion : 0,
    color : "",
    dynastyName : ""
};

// family members map with unique ids
let familyMembers = {};

// store region that was last clicked on here
// TODO DISABLE UPDAATING THIS ONCE CONFIRMED WAS CLICK
// ^- or store a copy for the battle screen so if another province is clicked
// ^- we dont accidently refer to something else
let chosenRegion;
// hackish way of keeping track of selecte member in tree
let selectedMemberWrapper = {
    element : null,
    member : null
};
// keep track of icon name chosen
let iconChosen = DEFAULT_ICON_CHOICE;

let iconChoices = {
    "king_1_choice" : "./media/king_1.png",
    "king_2_choice" : "./media/king_2.png",
    "king_3_choice" : "./media/king_3.png",
    "queen_1_choice" : "./media/queen_1.png",
    "queen_2_choice" : "./media/queen_2.png",
    "queen_3_choice" : "./media/queen_3.png"
};

const M_GENDER = "m";
const F_GENDER = "f";
let babyIcons = {
    "m" : "./media/baby_boy.png",
    "f" : "./media/baby_girl.png"
};
let kidIcons = {
    "m" : "./media/boy.png",
    "f" : "./media/girl.png"
};



// character object for each descendant
// todo by default iconUrl is baby url
function Character(name, age, skillLevel, iconUrl, gender) {
    this.name = name;
    this.age = age;
    // TODO SKILL LEVEL IS RANDOM FROM 1-3 FOR NEW PEOPLE!
    this.skillLevel = skillLevel;
    this.isAlive = true;
    // nation they are married to;
    this.spouse = null;
    // array of references to other children
    this.children = [];
    // increment unique character id counter
    this.uniqueId = uniqueId;
    familyMembers[uniqueId] = this;
    uniqueId++;
    this.iconUrl = iconUrl;
    this.gender = gender;
    // if icon is permanent (should not change to random icon once become adult)
    this.iconSet = false;
}

// All Dynasty Names as Constants
const REBELS_DYNASTY = "Rebels Faction";
const FRANCE_DYNASTY = "Capet";
const ENGLAND_DYNASTY = "of Godwin";
const WALES_DYNASTY = "Dinefwr";
const GERMANY_DYNASTY = "Salian";
const SCOTLAND_DYNASTY = "Dunkeld";
const SWEDEN_DYNASTY = "af Munso";
const NORWAY_DYNASTY = "Yngling";
const DENMARK_DYNASTY = "Estrid";
const ICELAND_DYNASTY = "af Haukadalur";
const BRITTANY_DYNASTY = "de Rennes";
const MUAIDHE_DYNASTY = "ua Conchobair";
const LEIX_DYNASTY = "mac Gilla-Patraic";
const OBOTRITIA_DYNASTY = "Wizlawid";
const POMERIA_DYNASTY = "z Pomorza";
const PRUTHENIA_DYNASTY = "von Marienburg";
const ESTONIA_DYNASTY = "Parn";
const POLAND_DYNASTY = "Piast";
const HUNGARY_DYNASTY = "Arpad";
const SUOMI_DYNASTY = "Virtanen";
const RUS_DYNASTY = "Rurikid";
const PECHENEGS_DYNASTY = "Golovin";
const CRIMEA_DYNASTY = "Bakhchisaray";
const CUMANIA_DYNASTY = "Terteroba";
const CROATIA_DYNASTY = "Trpirnirovic";
const SERBIA_DYNASTY = "Dukljanin";
const BYZANTINE_DYNASTY = "Doukas";
const GENOA_DYNASTY = "Doria";
const PAPAL_DYNASTY = "da Baggio";
const APULIA_DYNASTY = "de Hauteville";
const SARDINIA_DYNASTY = "de Lacon";
const GALICIA_DYNASTY = "Vimaranes";
const LEON_DYNASTY = "Jimena";
const CASTILLE_DYNASTY = "Lara";
const BARCELONA_DYNASTY = "de Barcelona";
const GRANADA_DYNASTY = "Zirid";
const ALMORAVID_DYNASTY = "Almoravid";
const MAGHRAWAVID_DYNASTY = "Maghrawavid";
const ZIRID_DYNASTY = "Riyahdid";
const FATIMID_DYNASTY = "Fatimid";
const HASHIMID_DYNASTY = "Hashimid";

// All Kingdom Names as constants
const REBELS = "Rebels Faction";  // TODO all rebels are represented by same rebel mob faction.
const FRANCE = "Kingdom of France";
const ENGLAND = "Kingdom of England";
const WALES = "Kingdom of Wales";
const GERMANY = "Holy Roman Empire";
const SCOTLAND = "Kingdom of Scotland";
const SWEDEN = "Kingdom of Sweden";
const NORWAY = "Kingdom of Norway";
const DENMARK = "Kingdom of Denmark";
const ICELAND = "Kingdom of Iceland";
const BRITTANY = "Duchy of Brittany";
const MUAIDHE = "Kingdom of Muaidhe";
const LEIX = "Kingdom of Leix";
const OBOTRITIA = "High Chiefdom of Obotritia";
const POMERIA = "High Chiefdom of Pomeria";
const PRUTHENIA = "High Chiefdom of Pruthenia";
const ESTONIA = "High Chiefdom of Estonia";
const POLAND = "Kingdom of Poland";
const HUNGARY = "Kingdom of Hungary";
const SUOMI = "High Chiefdom of Suomi";
const RUS = "Kingdom of Kievan Rus";
const PECHENEGS = "Khanate of Pechenegs";
const CRIMEA = "Khanate of Crimea";
const CUMANIA = "Khanate of Cumania";
const CROATIA = "Kingdom of Croatia";
const SERBIA = "Kingdom of Serbia";
const BYZANTINE = "Byzantine Empire";
const GENOA = "Republic of Genoa";
const PAPAL = "Papal States";
const APULIA = "Duchy of Apulia";
const SARDINIA = "Kingdom of Sardinia";
const GALICIA = "Kingdom of Galicia";
const LEON = "Kingdom of Leon";
const CASTILLE = "Kingdom of Castille";
const BARCELONA = "Duchy of Barcelona";
const GRANADA = "Emirate of Granada";
const ALMORAVID = "Almoravid Sultanate";
const MAGHRAWAVID = "Maghrawavid Emirate";
const ZIRID = "Zirid Sultanate";
const FATIMID = "Fatimid Sultanate";
const HASHIMID = "Hashimid Sultanate";

// flag urls
const REBELS_FLAG = "./media/flag_rebels.png";
const FRANCE_FLAG = "./media/flag_france.png";
const ENGLAND_FLAG = "./media/flag_england.png";
const WALES_FLAG = "./media/flag_wales.png";
const GERMANY_FLAG = "./media/flag_germany.png";
const SCOTLAND_FLAG = "./media/flag_scotland.png";
const SWEDEN_FLAG = "./media/flag_sweden.png";
const NORWAY_FLAG = "./media/flag_norway.jpg";
const DENMARK_FLAG = "./media/flag_denmark.png";
const ICELAND_FLAG = "./media/flag_iceland.png";
const BRITTANY_FLAG = "./media/flag_brittany.png";
const MUAIDHE_FLAG = "./media/ConnachtFlag.png";
const LEIX_FLAG = "./media/leix.png";
const OBOTRITIA_FLAG = "./media/OBOTRITIA_FLAG.png";
const POMERIA_FLAG = "./media/POMERIA_FLAG.png";
const PRUTHENIA_FLAG = "./media/PRUTHENIA_FLAG.png";
const ESTONIA_FLAG = "./media/estonia.png";
const POLAND_FLAG = "./media/POLAND_FLAG.png";
const HUNGARY_FLAG = "./media/HUNGARY_FLAG.png";
const SUOMI_FLAG = "./media/finland.png";
const RUS_FLAG = "./media/flag_rus.png";
const PECHENEGS_FLAG = "./media/PECHENEGS_FLAG.png";
const CRIMEA_FLAG = "./media/crimea.png";
const CUMANIA_FLAG = "./media/CUMANIA_FLAG.png";
const CROATIA_FLAG = "./media/Flag_of_Kingdom_of_Croatia.png";
const SERBIA_FLAG = "./media/serbia.png";
const BYZANTINE_FLAG = "./media/BYZANTINE_FLAG.png";
const GENOA_FLAG = "./media/Flag_of_Genoa.svg.png";
const PAPAL_FLAG = "./media/vaticanflag.jpeg";
const APULIA_FLAG = "./media/Flag_of_Apulia.svg.png";
const SARDINIA_FLAG = "./media/sardinia.png";
const GALICIA_FLAG = "./media/2000px-Flag_of_Galicia.svg.png";
const LEON_FLAG = "./media/leon_flag.png";
const CASTILLE_FLAG = "./media/1280px-Flag_of_Castile.svg.png";
const BARCELONA_FLAG = "./media/640px-Flag_of_Catalonia.svg.png";
const GRANADA_FLAG = "./media/305931.png";
const ALMORAVID_FLAG = "./media/s-l1600.png";
const MAGHRAWAVID_FLAG = "./media/Flag_of_Morocco_1073_1147.svg.png";
const ZIRID_FLAG = "./media/zirid.png";
const FATIMID_FLAG = "./media/fatimid.png";
const HASHIMID_FLAG = "./media/Hashmite_Banner.png";

// all countries (exclude player)
// store name, flag url, opinion (random from 1-50)
// TODO ADD DYNASTY NAME
let Rebels = {
        name : REBELS,
        flagUrl: REBELS_FLAG,
        opinion: 0,
        color : "#ff1919",
        dynastyName : REBELS_DYNASTY
};
let France = {
        name : FRANCE,
        flagUrl: FRANCE_FLAG,
        opinion: Math.floor(Math.random()*MAX_STARTING_PROVINCE_OPINION)+1,
        color : "#0000f3",
        dynastyName : FRANCE_DYNASTY
};
let England = {
        name : ENGLAND,
        flagUrl: ENGLAND_FLAG,
        opinion: Math.floor(Math.random()*MAX_STARTING_PROVINCE_OPINION)+1,
        color : "#ff0000",
        dynastyName : ENGLAND_DYNASTY
};
let Wales = {
        name : WALES,
        flagUrl: WALES_FLAG,
        opinion: Math.floor(Math.random()*MAX_STARTING_PROVINCE_OPINION)+1,
        color : "#abc335",
        dynastyName : WALES_DYNASTY
};
let Germany = {
        name : GERMANY,
        flagUrl: GERMANY_FLAG,
        opinion: Math.floor(Math.random()*MAX_STARTING_PROVINCE_OPINION)+1,
        color : "#f2f2f2",
        dynastyName : GERMANY_DYNASTY
};
let Scotland = {
        name : SCOTLAND,
        flagUrl: SCOTLAND_FLAG,
        opinion: Math.floor(Math.random()*MAX_STARTING_PROVINCE_OPINION)+1,
        color : "#00009c",
        dynastyName : SCOTLAND_DYNASTY
};
let Sweden = {
        name : SWEDEN,
        flagUrl: SWEDEN_FLAG,
        opinion: Math.floor(Math.random()*MAX_STARTING_PROVINCE_OPINION)+1,
        color : "#0f2af0",
        dynastyName : SWEDEN_DYNASTY
};
let Norway = {
        name : NORWAY,
        flagUrl: NORWAY_FLAG,
        opinion: Math.floor(Math.random()*MAX_STARTING_PROVINCE_OPINION)+1,
        color : "#8086e6",
        dynastyName : NORWAY_DYNASTY
};
let Denmark = {
        name : DENMARK,
        flagUrl: DENMARK_FLAG,
        opinion: Math.floor(Math.random()*MAX_STARTING_PROVINCE_OPINION)+1,
        color : "#ff5c06",
        dynastyName : DENMARK_DYNASTY
};
let Iceland = {
        name : ICELAND,
        flagUrl: ICELAND_FLAG,
        opinion: Math.floor(Math.random()*MAX_STARTING_PROVINCE_OPINION)+1,
        color : "#cccccc",
        dynastyName : ICELAND_DYNASTY
};
let Brittany = {
        name : BRITTANY,
        flagUrl: BRITTANY_FLAG,
        opinion: Math.floor(Math.random()*MAX_STARTING_PROVINCE_OPINION)+1,
        color : "#953a3a",
        dynastyName : BRITTANY_DYNASTY
};
let Muaidhe = {
        name : MUAIDHE,
        flagUrl: MUAIDHE_FLAG,
        opinion: Math.floor(Math.random()*MAX_STARTING_PROVINCE_OPINION)+1,
        color : "#3fe33f",
        dynastyName : MUAIDHE_DYNASTY
};
let Leix = {
        name : LEIX,
        flagUrl: LEIX_FLAG,
        opinion: Math.floor(Math.random()*MAX_STARTING_PROVINCE_OPINION)+1,
        color : "#008000",
        dynastyName : LEIX_DYNASTY
};
let Obotritia = {
        name : OBOTRITIA,
        flagUrl: OBOTRITIA_FLAG,
        opinion: Math.floor(Math.random()*MAX_STARTING_PROVINCE_OPINION)+1,
        color : "#c87137",
        dynastyName : OBOTRITIA_DYNASTY
};
let Pomeria = {
        name : POMERIA,
        flagUrl: POMERIA_FLAG,
        opinion: Math.floor(Math.random()*MAX_STARTING_PROVINCE_OPINION)+1,
        color : "#008000",
        dynastyName : POMERIA_DYNASTY
};
let Pruthenia = {
        name : PRUTHENIA,
        flagUrl: PRUTHENIA_FLAG,
        opinion: Math.floor(Math.random()*MAX_STARTING_PROVINCE_OPINION)+1,
        color : "#771f1a",
        dynastyName : PRUTHENIA_DYNASTY
};
let Estonia = {
        name : ESTONIA,
        flagUrl: ESTONIA_FLAG,
        opinion: Math.floor(Math.random()*MAX_STARTING_PROVINCE_OPINION)+1,
        color : "#aa335d",
        dynastyName : ESTONIA_DYNASTY
};
let Poland = {
        name : POLAND,
        flagUrl: POLAND_FLAG,
        opinion: Math.floor(Math.random()*MAX_STARTING_PROVINCE_OPINION)+1,
        color : "#ce0000",
        dynastyName : POLAND_DYNASTY
};
let Hungary = {
        name : HUNGARY,
        flagUrl: HUNGARY_FLAG,
        opinion: Math.floor(Math.random()*MAX_STARTING_PROVINCE_OPINION)+1,
        color : "#f5816a",
        dynastyName : HUNGARY_DYNASTY
};
let Suomi = {
        name : SUOMI,
        flagUrl: SUOMI_FLAG,
        opinion: Math.floor(Math.random()*MAX_STARTING_PROVINCE_OPINION)+1,
        color : "#713f1f",
        dynastyName : SUOMI_DYNASTY
};
let Rus = {
        name : RUS,
        flagUrl: RUS_FLAG,
        opinion: Math.floor(Math.random()*MAX_STARTING_PROVINCE_OPINION)+1,
        color : "#00ab1f",
        dynastyName : RUS_DYNASTY
};
let Pechenegs = {
        name : PECHENEGS,
        flagUrl: PECHENEGS_FLAG,
        opinion: Math.floor(Math.random()*MAX_STARTING_PROVINCE_OPINION)+1,
        color : "#ff7f2a",
        dynastyName : PECHENEGS_DYNASTY
};
let Crimea = {
        name : CRIMEA,
        flagUrl: CRIMEA_FLAG,
        opinion: Math.floor(Math.random()*MAX_STARTING_PROVINCE_OPINION)+1,
        color : "#ff2a2a",
        dynastyName : CRIMEA_DYNASTY
};
let Cumania = {
        name : CUMANIA,
        flagUrl: CUMANIA_FLAG,
        opinion: Math.floor(Math.random()*MAX_STARTING_PROVINCE_OPINION)+1,
        color : "#ffaaaa",
        dynastyName : CUMANIA_DYNASTY
};
let Croatia = {
        name : CROATIA,
        flagUrl: CROATIA_FLAG,
        opinion: Math.floor(Math.random()*MAX_STARTING_PROVINCE_OPINION)+1,
        color : "#402440",
        dynastyName : CROATIA_DYNASTY
};
let Serbia = {
        name : SERBIA,
        flagUrl: SERBIA_FLAG,
        opinion: Math.floor(Math.random()*MAX_STARTING_PROVINCE_OPINION)+1,
        color : "#6c5353",
        dynastyName : SERBIA_DYNASTY
};
let Byzantine = {
        name : BYZANTINE,
        flagUrl: BYZANTINE_FLAG,
        opinion: Math.floor(Math.random()*MAX_STARTING_PROVINCE_OPINION)+1,
        color : "#800060",
        dynastyName : BYZANTINE_DYNASTY
};
let Genoa = {
        name : GENOA,
        flagUrl: GENOA_FLAG,
        opinion: Math.floor(Math.random()*MAX_STARTING_PROVINCE_OPINION)+1,
        color : "#ff5555",
        dynastyName : GENOA_DYNASTY
};
let Papal = {
        name : PAPAL,
        flagUrl: PAPAL_FLAG,
        opinion: Math.floor(Math.random()*MAX_STARTING_PROVINCE_OPINION)+1,
        color : "#ffc654",
        dynastyName : PAPAL_DYNASTY
};
let Apulia = {
        name : APULIA,
        flagUrl: APULIA_FLAG,
        opinion: Math.floor(Math.random()*MAX_STARTING_PROVINCE_OPINION)+1,
        color : "#a8c13c",
        dynastyName : APULIA_DYNASTY
};
let Sardinia = {
        name : SARDINIA,
        flagUrl: SARDINIA_FLAG,
        opinion: Math.floor(Math.random()*MAX_STARTING_PROVINCE_OPINION)+1,
        color : "#008080",
        dynastyName : SARDINIA_DYNASTY
};
let Galicia = {
        name : GALICIA,
        flagUrl: GALICIA_FLAG,
        opinion: Math.floor(Math.random()*MAX_STARTING_PROVINCE_OPINION)+1,
        color : "#ffaaaa",
        dynastyName : GALICIA_DYNASTY
};
let Leon = {
        name : LEON,
        flagUrl: LEON_FLAG,
        opinion: Math.floor(Math.random()*MAX_STARTING_PROVINCE_OPINION)+1,
        color : "#ff7f2a",
        dynastyName : LEON_DYNASTY
};
let Castille = {
        name : CASTILLE,
        flagUrl: CASTILLE_FLAG,
        opinion: Math.floor(Math.random()*MAX_STARTING_PROVINCE_OPINION)+1,
        color : "#fff916",
        dynastyName : CASTILLE_DYNASTY
};
let Barcelona = {
        name : BARCELONA,
        flagUrl: BARCELONA_FLAG,
        opinion: Math.floor(Math.random()*MAX_STARTING_PROVINCE_OPINION)+1,
        color : "#691111",
        dynastyName : BARCELONA_DYNASTY
};
let Granada = {
        name : GRANADA,
        flagUrl: GRANADA_FLAG,
        opinion: Math.floor(Math.random()*MAX_STARTING_PROVINCE_OPINION)+1,
        color : "#0aff0a",
        dynastyName : GRANADA_DYNASTY
};
let Almoravid = {
        name : ALMORAVID,
        flagUrl: ALMORAVID_FLAG,
        opinion: Math.floor(Math.random()*MAX_STARTING_PROVINCE_OPINION)+1,
        color : "#00ff76",
        dynastyName : ALMORAVID_DYNASTY
};
let Maghrawavid = {
        name : MAGHRAWAVID,
        flagUrl: MAGHRAWAVID_FLAG,
        opinion: Math.floor(Math.random()*MAX_STARTING_PROVINCE_OPINION)+1,
        color : "#d8d827",
        dynastyName : MAGHRAWAVID_DYNASTY
};
let Zirid = {
        name : ZIRID,
        flagUrl: ZIRID_FLAG,
        opinion: Math.floor(Math.random()*MAX_STARTING_PROVINCE_OPINION)+1,
        color : "#0fdd00",
        dynastyName : ZIRID_DYNASTY
};
let Fatimid = {
        name : FATIMID,
        flagUrl: FATIMID_FLAG,
        opinion: Math.floor(Math.random()*MAX_STARTING_PROVINCE_OPINION)+1,
        color : "#22dd7f",
        dynastyName : FATIMID_DYNASTY
};
let Hashimid = {
        name : HASHIMID,
        flagUrl: HASHIMID_FLAG,
        opinion: Math.floor(Math.random()*MAX_STARTING_PROVINCE_OPINION)+1,
        color : "#8eff00",
        dynastyName : HASHIMID_DYNASTY
};

// TODO WHAT IF THE DYNASTY DOESNT EXIST ANYMORE??? makes no sense...
// TODO IMPLEMENT DYNASTY HAS DIED/FALLEN EVENT! (and label them as "Dead" or gone etc in data)
//   - label as dead so we don't use their name in events!
// all OTHER (non player) country objects in array
let countries = [Rebels, France, England, Wales, Germany, Scotland, Sweden, Norway, Denmark,
Iceland, Brittany, Muaidhe, Leix, Obotritia, Pomeria, Pruthenia, Estonia, Poland,
Hungary, Suomi, Rus, Pechenegs, Crimea, Cumania, Croatia, Serbia, Byzantine, Genoa,
Papal, Apulia, Sardinia, Galicia, Leon, Castille, Barcelona, Granada, Almoravid, Maghrawavid,
Zirid, Fatimid, Hashimid];

// INFO: now baden's default ownership is Germany if we change starting region!
// *** If any colors or ownership is changed in svg file we must update the colors and ownership here
// defining all region ownership and properties in a map (id comes from svg)
let regions = {
    "Leon" : {
        name : "Leon",
        countryOwner: Leon,
        soldiers : Math.floor(Math.random() * (MAX_PROVINCE_SOLDIERS - MIN_PROVINCE_SOLDIERS) + MIN_PROVINCE_SOLDIERS)
    }, "Toledo"  : {
        name : "Toledo",
        countryOwner: Granada,
        soldiers : Math.floor(Math.random() * (MAX_PROVINCE_SOLDIERS - MIN_PROVINCE_SOLDIERS) + MIN_PROVINCE_SOLDIERS)
    }, "Castilla"  : {
        name : "Castilla",
        countryOwner: Castille,
        soldiers : Math.floor(Math.random() * (MAX_PROVINCE_SOLDIERS - MIN_PROVINCE_SOLDIERS) + MIN_PROVINCE_SOLDIERS)
    }, "Alcala"  : {
        name : "Alcala",
        countryOwner: Castille,
        soldiers : Math.floor(Math.random() * (MAX_PROVINCE_SOLDIERS - MIN_PROVINCE_SOLDIERS) + MIN_PROVINCE_SOLDIERS)
    }, "Aragon"  : {
        name : "Aragon",
        countryOwner: Granada,
        soldiers : Math.floor(Math.random() * (MAX_PROVINCE_SOLDIERS - MIN_PROVINCE_SOLDIERS) + MIN_PROVINCE_SOLDIERS)
    }, "Navaare"  : {
        name : "Navaare",
        countryOwner: Castille,
        soldiers : Math.floor(Math.random() * (MAX_PROVINCE_SOLDIERS - MIN_PROVINCE_SOLDIERS) + MIN_PROVINCE_SOLDIERS)
    }, "Asturia"  : {
        name : "Asturia",
        countryOwner: Leon,
        soldiers : Math.floor(Math.random() * (MAX_PROVINCE_SOLDIERS - MIN_PROVINCE_SOLDIERS) + MIN_PROVINCE_SOLDIERS)
    }, "Galicia"  : {
        name : "Galicia",
        countryOwner: Galicia,
        soldiers : Math.floor(Math.random() * (MAX_PROVINCE_SOLDIERS - MIN_PROVINCE_SOLDIERS) + MIN_PROVINCE_SOLDIERS)
    }, "Minho"  : {
        name : "Minho",
        countryOwner: Galicia,
        soldiers : Math.floor(Math.random() * (MAX_PROVINCE_SOLDIERS - MIN_PROVINCE_SOLDIERS) + MIN_PROVINCE_SOLDIERS)
    }, "Beira"  : {
        name : "Beira",
        countryOwner: Galicia,
        soldiers : Math.floor(Math.random() * (MAX_PROVINCE_SOLDIERS - MIN_PROVINCE_SOLDIERS) + MIN_PROVINCE_SOLDIERS)
    }, "Lisbon"  : {
        name : "Lisbon",
        countryOwner: Granada,
        soldiers : Math.floor(Math.random() * (MAX_PROVINCE_SOLDIERS - MIN_PROVINCE_SOLDIERS) + MIN_PROVINCE_SOLDIERS)
    }, "Alemetejo"  : {
        name : "Alemetejo",
        countryOwner: Granada,
        soldiers : Math.floor(Math.random() * (MAX_PROVINCE_SOLDIERS - MIN_PROVINCE_SOLDIERS) + MIN_PROVINCE_SOLDIERS)
    }, "Estremadura"  : {
        name : "Estremadura",
        countryOwner: Granada,
        soldiers : Math.floor(Math.random() * (MAX_PROVINCE_SOLDIERS - MIN_PROVINCE_SOLDIERS) + MIN_PROVINCE_SOLDIERS)
    }, "Andalusia"  : {
        name : "Andalusia",
        countryOwner: Granada,
        soldiers : Math.floor(Math.random() * (MAX_PROVINCE_SOLDIERS - MIN_PROVINCE_SOLDIERS) + MIN_PROVINCE_SOLDIERS)
    }, "Algeciras"  : {
        name : "Algeciras",
        countryOwner: Granada,
        soldiers : Math.floor(Math.random() * (MAX_PROVINCE_SOLDIERS - MIN_PROVINCE_SOLDIERS) + MIN_PROVINCE_SOLDIERS)
    }, "Granada"  : {
        name : "Granada",
        countryOwner: Granada,
        soldiers : Math.floor(Math.random() * (MAX_PROVINCE_SOLDIERS - MIN_PROVINCE_SOLDIERS) + MIN_PROVINCE_SOLDIERS)
    }, "Murcia"  : {
        name : "Murcia",
        countryOwner: Granada,
        soldiers : Math.floor(Math.random() * (MAX_PROVINCE_SOLDIERS - MIN_PROVINCE_SOLDIERS) + MIN_PROVINCE_SOLDIERS)
    }, "Balansiyya"  : {
        name : "Balansiyya",
        countryOwner: Granada,
        soldiers : Math.floor(Math.random() * (MAX_PROVINCE_SOLDIERS - MIN_PROVINCE_SOLDIERS) + MIN_PROVINCE_SOLDIERS)
    }, "Catalonia"  : {
        name : "Catalonia",
        countryOwner: Barcelona,
        soldiers : Math.floor(Math.random() * (MAX_PROVINCE_SOLDIERS - MIN_PROVINCE_SOLDIERS) + MIN_PROVINCE_SOLDIERS)
    }, "Pyrenees"  : {
        name : "Pyrenees",
        countryOwner: Barcelona,
        soldiers : Math.floor(Math.random() * (MAX_PROVINCE_SOLDIERS - MIN_PROVINCE_SOLDIERS) + MIN_PROVINCE_SOLDIERS)
    }, "Balearic-Islands"  : {
        name : "Balearic-Islands",
        countryOwner: Granada,
        soldiers : Math.floor(Math.random() * (MAX_PROVINCE_SOLDIERS - MIN_PROVINCE_SOLDIERS) + MIN_PROVINCE_SOLDIERS)
    }, "Languedoc"  : {
        name : "Languedoc",
        countryOwner: France,
        soldiers : Math.floor(Math.random() * (MAX_PROVINCE_SOLDIERS - MIN_PROVINCE_SOLDIERS) + MIN_PROVINCE_SOLDIERS)
    }, "Gascony"  : {
        name : "Gascony",
        countryOwner: France,
        soldiers : Math.floor(Math.random() * (MAX_PROVINCE_SOLDIERS - MIN_PROVINCE_SOLDIERS) + MIN_PROVINCE_SOLDIERS)
    }, "Guyenne"  : {
        name : "Guyenne",
        countryOwner: France,
        soldiers : Math.floor(Math.random() * (MAX_PROVINCE_SOLDIERS - MIN_PROVINCE_SOLDIERS) + MIN_PROVINCE_SOLDIERS)
    }, "Auvergne"  : {
        name : "Auvergne",
        countryOwner: France,
        soldiers : Math.floor(Math.random() * (MAX_PROVINCE_SOLDIERS - MIN_PROVINCE_SOLDIERS) + MIN_PROVINCE_SOLDIERS)
    }, "Provence"  : {
        name : "Provence",
        countryOwner: Germany,
        soldiers : Math.floor(Math.random() * (MAX_PROVINCE_SOLDIERS - MIN_PROVINCE_SOLDIERS) + MIN_PROVINCE_SOLDIERS)
    }, "Savoy"  : {
        name : "Savoy",
        countryOwner: Germany,
        soldiers : Math.floor(Math.random() * (MAX_PROVINCE_SOLDIERS - MIN_PROVINCE_SOLDIERS) + MIN_PROVINCE_SOLDIERS)
    }, "Piedmont"  : {
        name : "Piedmont",
        countryOwner: Germany,
        soldiers : Math.floor(Math.random() * (MAX_PROVINCE_SOLDIERS - MIN_PROVINCE_SOLDIERS) + MIN_PROVINCE_SOLDIERS)
    }, "Genoa"  : {
        name : "Genoa",
        countryOwner: Genoa,
        soldiers : Math.floor(Math.random() * (MAX_PROVINCE_SOLDIERS - MIN_PROVINCE_SOLDIERS) + MIN_PROVINCE_SOLDIERS)
    }, "Pisa"  : {
        name : "Pisa",
        countryOwner: Germany,
        soldiers : Math.floor(Math.random() * (MAX_PROVINCE_SOLDIERS - MIN_PROVINCE_SOLDIERS) + MIN_PROVINCE_SOLDIERS)
    }, "Ravenna"  : {
        name : "Ravenna",
        countryOwner: Germany,
        soldiers : Math.floor(Math.random() * (MAX_PROVINCE_SOLDIERS - MIN_PROVINCE_SOLDIERS) + MIN_PROVINCE_SOLDIERS)
    }, "Roma"  : {
        name : "Roma",
        countryOwner: Papal,
        soldiers : Math.floor(Math.random() * (MAX_PROVINCE_SOLDIERS - MIN_PROVINCE_SOLDIERS) + MIN_PROVINCE_SOLDIERS)
    }, "Naples"  : {
        name : "Naples",
        countryOwner: Germany,
        soldiers : Math.floor(Math.random() * (MAX_PROVINCE_SOLDIERS - MIN_PROVINCE_SOLDIERS) + MIN_PROVINCE_SOLDIERS)
    }, "Apulia"  : {
        name : "Apulia",
        countryOwner: Apulia,
        soldiers : Math.floor(Math.random() * (MAX_PROVINCE_SOLDIERS - MIN_PROVINCE_SOLDIERS) + MIN_PROVINCE_SOLDIERS)
    }, "Sicily"  : {
        name : "Sicily",
        countryOwner: Apulia,
        soldiers : Math.floor(Math.random() * (MAX_PROVINCE_SOLDIERS - MIN_PROVINCE_SOLDIERS) + MIN_PROVINCE_SOLDIERS)
    }, "Sardinia"  : {
        name : "Sardinia",
        countryOwner: Sardinia,
        soldiers : Math.floor(Math.random() * (MAX_PROVINCE_SOLDIERS - MIN_PROVINCE_SOLDIERS) + MIN_PROVINCE_SOLDIERS)
    }, "Corsica"  : {
        name : "Corsica",
        countryOwner: Germany,
        soldiers : Math.floor(Math.random() * (MAX_PROVINCE_SOLDIERS - MIN_PROVINCE_SOLDIERS) + MIN_PROVINCE_SOLDIERS)
    }, "Burgundy"  : {
        name : "Burgundy",
        countryOwner: France,
        soldiers : Math.floor(Math.random() * (MAX_PROVINCE_SOLDIERS - MIN_PROVINCE_SOLDIERS) + MIN_PROVINCE_SOLDIERS)
    }, "Blois"  : {
        name : "Blois",
        countryOwner: France,
        soldiers : Math.floor(Math.random() * (MAX_PROVINCE_SOLDIERS - MIN_PROVINCE_SOLDIERS) + MIN_PROVINCE_SOLDIERS)
    }, "Anjou"  : {
        name : "Anjou",
        countryOwner: France,
        soldiers : Math.floor(Math.random() * (MAX_PROVINCE_SOLDIERS - MIN_PROVINCE_SOLDIERS) + MIN_PROVINCE_SOLDIERS)
    }, "Brittany"  : {
        name : "Brittany",
        countryOwner: Brittany,
        soldiers : Math.floor(Math.random() * (MAX_PROVINCE_SOLDIERS - MIN_PROVINCE_SOLDIERS) + MIN_PROVINCE_SOLDIERS)
    }, "Normandy"  : {
        name : "Normandy",
        countryOwner: France,
        soldiers : Math.floor(Math.random() * (MAX_PROVINCE_SOLDIERS - MIN_PROVINCE_SOLDIERS) + MIN_PROVINCE_SOLDIERS)
    }, "Poitou"  : {
        name : "Poitou",
        countryOwner: France,
        soldiers : Math.floor(Math.random() * (MAX_PROVINCE_SOLDIERS - MIN_PROVINCE_SOLDIERS) + MIN_PROVINCE_SOLDIERS)
    }, "Paris"  : {
        name : "Paris",
        countryOwner: France,
        soldiers : Math.floor(Math.random() * (MAX_PROVINCE_SOLDIERS - MIN_PROVINCE_SOLDIERS) + MIN_PROVINCE_SOLDIERS)
    }, "Amiens"  : {
        name : "Amiens",
        countryOwner: France,
        soldiers : Math.floor(Math.random() * (MAX_PROVINCE_SOLDIERS - MIN_PROVINCE_SOLDIERS) + MIN_PROVINCE_SOLDIERS)
    }, "Champagne"  : {
        name : "Champagne",
        countryOwner: France,
        soldiers : Math.floor(Math.random() * (MAX_PROVINCE_SOLDIERS - MIN_PROVINCE_SOLDIERS) + MIN_PROVINCE_SOLDIERS)
    }, "Alsace-Lorraine"  : {
        name : "Alsace-Lorraine",
        countryOwner: France,
        soldiers : Math.floor(Math.random() * (MAX_PROVINCE_SOLDIERS - MIN_PROVINCE_SOLDIERS) + MIN_PROVINCE_SOLDIERS)
    }, "Franche-Comte"  : {
        name : "Franche-Comte",
        countryOwner: France,
        soldiers : Math.floor(Math.random() * (MAX_PROVINCE_SOLDIERS - MIN_PROVINCE_SOLDIERS) + MIN_PROVINCE_SOLDIERS)
    }, "Switzerland"  : {
        name : "Switzerland",
        countryOwner: Germany,
        soldiers : Math.floor(Math.random() * (MAX_PROVINCE_SOLDIERS - MIN_PROVINCE_SOLDIERS) + MIN_PROVINCE_SOLDIERS)
    }, "Lombardy"  : {
        name : "Lombardy",
        countryOwner: Germany,
        soldiers : Math.floor(Math.random() * (MAX_PROVINCE_SOLDIERS - MIN_PROVINCE_SOLDIERS) + MIN_PROVINCE_SOLDIERS)
    }, "Venice"  : {
        name : "Venice",
        countryOwner: Germany,
        soldiers : Math.floor(Math.random() * (MAX_PROVINCE_SOLDIERS - MIN_PROVINCE_SOLDIERS) + MIN_PROVINCE_SOLDIERS)
    }, "Tyrol"  : {
        name : "Tyrol",
        countryOwner: Germany,
        soldiers : Math.floor(Math.random() * (MAX_PROVINCE_SOLDIERS - MIN_PROVINCE_SOLDIERS) + MIN_PROVINCE_SOLDIERS)
    }, "Bavaria"  : {
        name : "Bavaria",
        countryOwner: Germany,
        soldiers : Math.floor(Math.random() * (MAX_PROVINCE_SOLDIERS - MIN_PROVINCE_SOLDIERS) + MIN_PROVINCE_SOLDIERS)
    }, "Wurttemburg"  : {
        name : "Wurttemburg",
        countryOwner: Germany,
        soldiers : Math.floor(Math.random() * (MAX_PROVINCE_SOLDIERS - MIN_PROVINCE_SOLDIERS) + MIN_PROVINCE_SOLDIERS)
    }, "Baden"  : {
        name : "Baden",
        countryOwner: Germany,
        soldiers : Math.floor(Math.random() * (MAX_PROVINCE_SOLDIERS - MIN_PROVINCE_SOLDIERS) + MIN_PROVINCE_SOLDIERS)
    }, "Westphalia"  : {
        name : "Westphalia",
        countryOwner: Germany,
        soldiers : Math.floor(Math.random() * (MAX_PROVINCE_SOLDIERS - MIN_PROVINCE_SOLDIERS) + MIN_PROVINCE_SOLDIERS)
    }, "Palatinate"  : {
        name : "Palatinate",
        countryOwner: Germany,
        soldiers : Math.floor(Math.random() * (MAX_PROVINCE_SOLDIERS - MIN_PROVINCE_SOLDIERS) + MIN_PROVINCE_SOLDIERS)
    }, "Toxandria"  : {
        name : "Toxandria",
        countryOwner: Germany,
        soldiers : Math.floor(Math.random() * (MAX_PROVINCE_SOLDIERS - MIN_PROVINCE_SOLDIERS) + MIN_PROVINCE_SOLDIERS)
    }, "Flanders"  : {
        name : "Flanders",
        countryOwner: Germany,
        soldiers : Math.floor(Math.random() * (MAX_PROVINCE_SOLDIERS - MIN_PROVINCE_SOLDIERS) + MIN_PROVINCE_SOLDIERS)
    }, "Holand"  : {
        name : "Holand",
        countryOwner: Germany,
        soldiers : Math.floor(Math.random() * (MAX_PROVINCE_SOLDIERS - MIN_PROVINCE_SOLDIERS) + MIN_PROVINCE_SOLDIERS)
    }, "Hannover"  : {
        name : "Hannover",
        countryOwner: Germany,
        soldiers : Math.floor(Math.random() * (MAX_PROVINCE_SOLDIERS - MIN_PROVINCE_SOLDIERS) + MIN_PROVINCE_SOLDIERS)
    }, "Hesse-Kassel"  : {
        name : "Hesse-Kassel",
        countryOwner: Germany,
        soldiers : Math.floor(Math.random() * (MAX_PROVINCE_SOLDIERS - MIN_PROVINCE_SOLDIERS) + MIN_PROVINCE_SOLDIERS)
    }, "Brunswick"  : {
        name : "Brunswick",
        countryOwner: Germany,
        soldiers : Math.floor(Math.random() * (MAX_PROVINCE_SOLDIERS - MIN_PROVINCE_SOLDIERS) + MIN_PROVINCE_SOLDIERS)
    }, "Schleswig-Holstein"  : {
        name : "Schleswig-Holstein",
        countryOwner: Denmark,
        soldiers : Math.floor(Math.random() * (MAX_PROVINCE_SOLDIERS - MIN_PROVINCE_SOLDIERS) + MIN_PROVINCE_SOLDIERS)
    }, "Denmark"  : {
        name : "Denmark",
        countryOwner: Denmark,
        soldiers : Math.floor(Math.random() * (MAX_PROVINCE_SOLDIERS - MIN_PROVINCE_SOLDIERS) + MIN_PROVINCE_SOLDIERS)
    }, "Copenhagen"  : {
        name : "Copenhagen",
        countryOwner: Denmark,
        soldiers : Math.floor(Math.random() * (MAX_PROVINCE_SOLDIERS - MIN_PROVINCE_SOLDIERS) + MIN_PROVINCE_SOLDIERS)
    }, "Tangier"  : {
        name : "Tangier",
        countryOwner: Almoravid,
        soldiers : Math.floor(Math.random() * (MAX_PROVINCE_SOLDIERS - MIN_PROVINCE_SOLDIERS) + MIN_PROVINCE_SOLDIERS)
    }, "Ifni"  : {
        name : "Ifni",
        countryOwner: Almoravid,
        soldiers : Math.floor(Math.random() * (MAX_PROVINCE_SOLDIERS - MIN_PROVINCE_SOLDIERS) + MIN_PROVINCE_SOLDIERS)
    }, "Fez"  : {
        name : "Fez",
        countryOwner: Almoravid,
        soldiers : Math.floor(Math.random() * (MAX_PROVINCE_SOLDIERS - MIN_PROVINCE_SOLDIERS) + MIN_PROVINCE_SOLDIERS)
    }, "Oran"  : {
        name : "Oran",
        countryOwner: Almoravid,
        soldiers : Math.floor(Math.random() * (MAX_PROVINCE_SOLDIERS - MIN_PROVINCE_SOLDIERS) + MIN_PROVINCE_SOLDIERS)
    }, "Algiers"  : {
        name : "Algiers",
        countryOwner: Almoravid,
        soldiers : Math.floor(Math.random() * (MAX_PROVINCE_SOLDIERS - MIN_PROVINCE_SOLDIERS) + MIN_PROVINCE_SOLDIERS)
    }, "Bona"  : {
        name : "Bona",
        countryOwner: Zirid,
        soldiers : Math.floor(Math.random() * (MAX_PROVINCE_SOLDIERS - MIN_PROVINCE_SOLDIERS) + MIN_PROVINCE_SOLDIERS)
    }, "Tunis"  : {
        name : "Tunis",
        countryOwner: Zirid,
        soldiers : Math.floor(Math.random() * (MAX_PROVINCE_SOLDIERS - MIN_PROVINCE_SOLDIERS) + MIN_PROVINCE_SOLDIERS)
    }, "Tunisia"  : {
        name : "Tunisia",
        countryOwner: Zirid,
        soldiers : Math.floor(Math.random() * (MAX_PROVINCE_SOLDIERS - MIN_PROVINCE_SOLDIERS) + MIN_PROVINCE_SOLDIERS)
    }, "Sahara"  : {
        name : "Sahara",
        countryOwner: Maghrawavid,
        soldiers : Math.floor(Math.random() * (MAX_PROVINCE_SOLDIERS - MIN_PROVINCE_SOLDIERS) + MIN_PROVINCE_SOLDIERS)
    }, "Tripolis"  : {
        name : "Tripolis",
        countryOwner: Zirid,
        soldiers : Math.floor(Math.random() * (MAX_PROVINCE_SOLDIERS - MIN_PROVINCE_SOLDIERS) + MIN_PROVINCE_SOLDIERS)
    }, "Cyrenicia"  : {
        name : "Cyrenicia",
        countryOwner: Fatimid,
        soldiers : Math.floor(Math.random() * (MAX_PROVINCE_SOLDIERS - MIN_PROVINCE_SOLDIERS) + MIN_PROVINCE_SOLDIERS)
    }, "Al-Baretoun"  : {
        name : "Al-Baretoun",
        countryOwner: Fatimid,
        soldiers : Math.floor(Math.random() * (MAX_PROVINCE_SOLDIERS - MIN_PROVINCE_SOLDIERS) + MIN_PROVINCE_SOLDIERS)
    }, "Alexandria"  : {
        name : "Alexandria",
        countryOwner: Fatimid,
        soldiers : Math.floor(Math.random() * (MAX_PROVINCE_SOLDIERS - MIN_PROVINCE_SOLDIERS) + MIN_PROVINCE_SOLDIERS)
    }, "Cairo"  : {
        name : "Cairo",
        countryOwner: Fatimid,
        soldiers : Math.floor(Math.random() * (MAX_PROVINCE_SOLDIERS - MIN_PROVINCE_SOLDIERS) + MIN_PROVINCE_SOLDIERS)
    }, "Sinai"  : {
        name : "Sinai",
        countryOwner: Fatimid,
        soldiers : Math.floor(Math.random() * (MAX_PROVINCE_SOLDIERS - MIN_PROVINCE_SOLDIERS) + MIN_PROVINCE_SOLDIERS)
    }, "Mecca"  : {
        name : "Mecca",
        countryOwner: Hashimid,
        soldiers : Math.floor(Math.random() * (MAX_PROVINCE_SOLDIERS - MIN_PROVINCE_SOLDIERS) + MIN_PROVINCE_SOLDIERS)
    }, "Darum"  : {
        name : "Darum",
        countryOwner: Fatimid,
        soldiers : Math.floor(Math.random() * (MAX_PROVINCE_SOLDIERS - MIN_PROVINCE_SOLDIERS) + MIN_PROVINCE_SOLDIERS)
    }, "Arabia"  : {
        name : "Arabia",
        countryOwner: Hashimid,
        soldiers : Math.floor(Math.random() * (MAX_PROVINCE_SOLDIERS - MIN_PROVINCE_SOLDIERS) + MIN_PROVINCE_SOLDIERS)
    }, "Baghdad"  : {
        name : "Baghdad",
        countryOwner: Hashimid,
        soldiers : Math.floor(Math.random() * (MAX_PROVINCE_SOLDIERS - MIN_PROVINCE_SOLDIERS) + MIN_PROVINCE_SOLDIERS)
    }, "Amman"  : {
        name : "Amman",
        countryOwner: Fatimid,
        soldiers : Math.floor(Math.random() * (MAX_PROVINCE_SOLDIERS - MIN_PROVINCE_SOLDIERS) + MIN_PROVINCE_SOLDIERS)
    }, "Tell-Bashir"  : {
        name : "Tell-Bashir",
        countryOwner: Byzantine,
        soldiers : Math.floor(Math.random() * (MAX_PROVINCE_SOLDIERS - MIN_PROVINCE_SOLDIERS) + MIN_PROVINCE_SOLDIERS)
    }, "Cyprus"  : {
        name : "Cyprus",
        countryOwner: Byzantine,
        soldiers : Math.floor(Math.random() * (MAX_PROVINCE_SOLDIERS - MIN_PROVINCE_SOLDIERS) + MIN_PROVINCE_SOLDIERS)
    }, "Kurdistan"  : {
        name : "Kurdistan",
        countryOwner: Byzantine,
        soldiers : Math.floor(Math.random() * (MAX_PROVINCE_SOLDIERS - MIN_PROVINCE_SOLDIERS) + MIN_PROVINCE_SOLDIERS)
    }, "Aremenia"  : {
        name : "Aremenia",
        countryOwner: Byzantine,
        soldiers : Math.floor(Math.random() * (MAX_PROVINCE_SOLDIERS - MIN_PROVINCE_SOLDIERS) + MIN_PROVINCE_SOLDIERS)
    }, "Mingrelia"  : {
        name : "Mingrelia",
        countryOwner: Cumania,
        soldiers : Math.floor(Math.random() * (MAX_PROVINCE_SOLDIERS - MIN_PROVINCE_SOLDIERS) + MIN_PROVINCE_SOLDIERS)
    }, "Sivas"  : {
        name : "Sivas",
        countryOwner: Byzantine,
        soldiers : Math.floor(Math.random() * (MAX_PROVINCE_SOLDIERS - MIN_PROVINCE_SOLDIERS) + MIN_PROVINCE_SOLDIERS)
    }, "Trebizond"  : {
        name : "Trebizond",
        countryOwner: Byzantine,
        soldiers : Math.floor(Math.random() * (MAX_PROVINCE_SOLDIERS - MIN_PROVINCE_SOLDIERS) + MIN_PROVINCE_SOLDIERS)
    }, "Cicilia"  : {
        name : "Cicilia",
        countryOwner: Byzantine,
        soldiers : Math.floor(Math.random() * (MAX_PROVINCE_SOLDIERS - MIN_PROVINCE_SOLDIERS) + MIN_PROVINCE_SOLDIERS)
    }, "Caramania"  : {
        name : "Caramania",
        countryOwner: Byzantine,
        soldiers : Math.floor(Math.random() * (MAX_PROVINCE_SOLDIERS - MIN_PROVINCE_SOLDIERS) + MIN_PROVINCE_SOLDIERS)
    }, "Sinope"  : {
        name : "Sinope",
        countryOwner: Byzantine,
        soldiers : Math.floor(Math.random() * (MAX_PROVINCE_SOLDIERS - MIN_PROVINCE_SOLDIERS) + MIN_PROVINCE_SOLDIERS)
    }, "Nicea"  : {
        name : "Nicea",
        countryOwner: Byzantine,
        soldiers : Math.floor(Math.random() * (MAX_PROVINCE_SOLDIERS - MIN_PROVINCE_SOLDIERS) + MIN_PROVINCE_SOLDIERS)
    }, "Hamid"  : {
        name : "Hamid",
        countryOwner: Byzantine,
        soldiers : Math.floor(Math.random() * (MAX_PROVINCE_SOLDIERS - MIN_PROVINCE_SOLDIERS) + MIN_PROVINCE_SOLDIERS)
    }, "Tekke"  : {
        name : "Tekke",
        countryOwner: Byzantine,
        soldiers : Math.floor(Math.random() * (MAX_PROVINCE_SOLDIERS - MIN_PROVINCE_SOLDIERS) + MIN_PROVINCE_SOLDIERS)
    }, "Menteshe"  : {
        name : "Menteshe",
        countryOwner: Byzantine,
        soldiers : Math.floor(Math.random() * (MAX_PROVINCE_SOLDIERS - MIN_PROVINCE_SOLDIERS) + MIN_PROVINCE_SOLDIERS)
    }, "Kerassi"  : {
        name : "Kerassi",
        countryOwner: Byzantine,
        soldiers : Math.floor(Math.random() * (MAX_PROVINCE_SOLDIERS - MIN_PROVINCE_SOLDIERS) + MIN_PROVINCE_SOLDIERS)
    }, "Crete"  : {
        name : "Crete",
        countryOwner: Byzantine,
        soldiers : Math.floor(Math.random() * (MAX_PROVINCE_SOLDIERS - MIN_PROVINCE_SOLDIERS) + MIN_PROVINCE_SOLDIERS)
    }, "Greece"  : {
        name : "Greece",
        countryOwner: Byzantine,
        soldiers : Math.floor(Math.random() * (MAX_PROVINCE_SOLDIERS - MIN_PROVINCE_SOLDIERS) + MIN_PROVINCE_SOLDIERS)
    }, "Thessaly"  : {
        name : "Thessaly",
        countryOwner: Byzantine,
        soldiers : Math.floor(Math.random() * (MAX_PROVINCE_SOLDIERS - MIN_PROVINCE_SOLDIERS) + MIN_PROVINCE_SOLDIERS)
    }, "Crotia"  : {
        name : "Crotia",
        countryOwner: Croatia,
        soldiers : Math.floor(Math.random() * (MAX_PROVINCE_SOLDIERS - MIN_PROVINCE_SOLDIERS) + MIN_PROVINCE_SOLDIERS)
    }, "Serbia"  : {
        name : "Serbia",
        countryOwner: Serbia,
        soldiers : Math.floor(Math.random() * (MAX_PROVINCE_SOLDIERS - MIN_PROVINCE_SOLDIERS) + MIN_PROVINCE_SOLDIERS)
    }, "Avlonas"  : {
        name : "Avlonas",
        countryOwner: Byzantine,
        soldiers : Math.floor(Math.random() * (MAX_PROVINCE_SOLDIERS - MIN_PROVINCE_SOLDIERS) + MIN_PROVINCE_SOLDIERS)
    }, "Astibus"  : {
        name : "Astibus",
        countryOwner: Byzantine,
        soldiers : Math.floor(Math.random() * (MAX_PROVINCE_SOLDIERS - MIN_PROVINCE_SOLDIERS) + MIN_PROVINCE_SOLDIERS)
    }, "Constantinople"  : {
        name : "Constantinople",
        countryOwner: Byzantine,
        soldiers : Math.floor(Math.random() * (MAX_PROVINCE_SOLDIERS - MIN_PROVINCE_SOLDIERS) + MIN_PROVINCE_SOLDIERS)
    }, "Nikopolis"  : {
        name : "Nikopolis",
        countryOwner: Byzantine,
        soldiers : Math.floor(Math.random() * (MAX_PROVINCE_SOLDIERS - MIN_PROVINCE_SOLDIERS) + MIN_PROVINCE_SOLDIERS)
    }, "Bononia"  : {
        name : "Bononia",
        countryOwner: Byzantine,
        soldiers : Math.floor(Math.random() * (MAX_PROVINCE_SOLDIERS - MIN_PROVINCE_SOLDIERS) + MIN_PROVINCE_SOLDIERS)
    }, "Wallachia"  : {
        name : "Wallachia",
        countryOwner: Byzantine,
        soldiers : Math.floor(Math.random() * (MAX_PROVINCE_SOLDIERS - MIN_PROVINCE_SOLDIERS) + MIN_PROVINCE_SOLDIERS)
    }, "Dobruja"  : {
        name : "Dobruja",
        countryOwner: Byzantine,
        soldiers : Math.floor(Math.random() * (MAX_PROVINCE_SOLDIERS - MIN_PROVINCE_SOLDIERS) + MIN_PROVINCE_SOLDIERS)
    }, "Istria"  : {
        name : "Istria",
        countryOwner: Croatia,
        soldiers : Math.floor(Math.random() * (MAX_PROVINCE_SOLDIERS - MIN_PROVINCE_SOLDIERS) + MIN_PROVINCE_SOLDIERS)
    }, "Carniola"  : {
        name : "Carniola",
        countryOwner: Germany,
        soldiers : Math.floor(Math.random() * (MAX_PROVINCE_SOLDIERS - MIN_PROVINCE_SOLDIERS) + MIN_PROVINCE_SOLDIERS)
    }, "Carinthia"  : {
        name : "Carinthia",
        countryOwner: Germany,
        soldiers : Math.floor(Math.random() * (MAX_PROVINCE_SOLDIERS - MIN_PROVINCE_SOLDIERS) + MIN_PROVINCE_SOLDIERS)
    }, "Styria"  : {
        name : "Styria",
        countryOwner: Germany,
        soldiers : Math.floor(Math.random() * (MAX_PROVINCE_SOLDIERS - MIN_PROVINCE_SOLDIERS) + MIN_PROVINCE_SOLDIERS)
    }, "Vienna"  : {
        name : "Vienna",
        countryOwner: Germany,
        soldiers : Math.floor(Math.random() * (MAX_PROVINCE_SOLDIERS - MIN_PROVINCE_SOLDIERS) + MIN_PROVINCE_SOLDIERS)
    }, "Niederosterreich"  : {
        name : "Niederosterreich",
        countryOwner: Germany,
        soldiers : Math.floor(Math.random() * (MAX_PROVINCE_SOLDIERS - MIN_PROVINCE_SOLDIERS) + MIN_PROVINCE_SOLDIERS)
    }, "Slavonia"  : {
        name : "Slavonia",
        countryOwner: Hungary,
        soldiers : Math.floor(Math.random() * (MAX_PROVINCE_SOLDIERS - MIN_PROVINCE_SOLDIERS) + MIN_PROVINCE_SOLDIERS)
    }, "Burgenland"  : {
        name : "Burgenland",
        countryOwner: Hungary,
        soldiers : Math.floor(Math.random() * (MAX_PROVINCE_SOLDIERS - MIN_PROVINCE_SOLDIERS) + MIN_PROVINCE_SOLDIERS)
    }, "Banat"  : {
        name : "Banat",
        countryOwner: Hungary,
        soldiers : Math.floor(Math.random() * (MAX_PROVINCE_SOLDIERS - MIN_PROVINCE_SOLDIERS) + MIN_PROVINCE_SOLDIERS)
    }, "Bihar"  : {
        name : "Bihar",
        countryOwner: Hungary,
        soldiers : Math.floor(Math.random() * (MAX_PROVINCE_SOLDIERS - MIN_PROVINCE_SOLDIERS) + MIN_PROVINCE_SOLDIERS)
    }, "Transylvania"  : {
        name : "Transylvania",
        countryOwner: Hungary,
        soldiers : Math.floor(Math.random() * (MAX_PROVINCE_SOLDIERS - MIN_PROVINCE_SOLDIERS) + MIN_PROVINCE_SOLDIERS)
    }, "Moldavia"  : {
        name : "Moldavia",
        countryOwner: Pechenegs,
        soldiers : Math.floor(Math.random() * (MAX_PROVINCE_SOLDIERS - MIN_PROVINCE_SOLDIERS) + MIN_PROVINCE_SOLDIERS)
    }, "Bessarabia"  : {
        name : "Bessarabia",
        countryOwner: Pechenegs,
        soldiers : Math.floor(Math.random() * (MAX_PROVINCE_SOLDIERS - MIN_PROVINCE_SOLDIERS) + MIN_PROVINCE_SOLDIERS)
    }, "Podolia"  : {
        name : "Podolia",
        countryOwner: Rus,
        soldiers : Math.floor(Math.random() * (MAX_PROVINCE_SOLDIERS - MIN_PROVINCE_SOLDIERS) + MIN_PROVINCE_SOLDIERS)
    }, "Red-Rus"  : {
        name : "Red-Rus",
        countryOwner: Rus,
        soldiers : Math.floor(Math.random() * (MAX_PROVINCE_SOLDIERS - MIN_PROVINCE_SOLDIERS) + MIN_PROVINCE_SOLDIERS)
    }, "Austrian-Galicia"  : {
        name : "Austrian-Galicia",
        countryOwner: Hungary,
        soldiers : Math.floor(Math.random() * (MAX_PROVINCE_SOLDIERS - MIN_PROVINCE_SOLDIERS) + MIN_PROVINCE_SOLDIERS)
    }, "Moravia"  : {
        name : "Moravia",
        countryOwner: Germany,
        soldiers : Math.floor(Math.random() * (MAX_PROVINCE_SOLDIERS - MIN_PROVINCE_SOLDIERS) + MIN_PROVINCE_SOLDIERS)
    }, "Bohemia"  : {
        name : "Bohemia",
        countryOwner: Germany,
        soldiers : Math.floor(Math.random() * (MAX_PROVINCE_SOLDIERS - MIN_PROVINCE_SOLDIERS) + MIN_PROVINCE_SOLDIERS)
    }, "Saxony"  : {
        name : "Saxony",
        countryOwner: Germany,
        soldiers : Math.floor(Math.random() * (MAX_PROVINCE_SOLDIERS - MIN_PROVINCE_SOLDIERS) + MIN_PROVINCE_SOLDIERS)
    }, "Silesia"  : {
        name : "Silesia",
        countryOwner: Poland,
        soldiers : Math.floor(Math.random() * (MAX_PROVINCE_SOLDIERS - MIN_PROVINCE_SOLDIERS) + MIN_PROVINCE_SOLDIERS)
    }, "Berlin"  : {
        name : "Berlin",
        countryOwner: Germany,
        soldiers : Math.floor(Math.random() * (MAX_PROVINCE_SOLDIERS - MIN_PROVINCE_SOLDIERS) + MIN_PROVINCE_SOLDIERS)
    }, "Poznan"  : {
        name : "Poznan",
        countryOwner: Poland,
        soldiers : Math.floor(Math.random() * (MAX_PROVINCE_SOLDIERS - MIN_PROVINCE_SOLDIERS) + MIN_PROVINCE_SOLDIERS)
    }, "Grodno"  : {
        name : "Grodno",
        countryOwner: Poland,
        soldiers : Math.floor(Math.random() * (MAX_PROVINCE_SOLDIERS - MIN_PROVINCE_SOLDIERS) + MIN_PROVINCE_SOLDIERS)
    }, "Mazonia"  : {
        name : "Mazonia",
        countryOwner: Pruthenia,
        soldiers : Math.floor(Math.random() * (MAX_PROVINCE_SOLDIERS - MIN_PROVINCE_SOLDIERS) + MIN_PROVINCE_SOLDIERS)
    }, "Obotritia"  : {
        name : "Obotritia",
        countryOwner: Obotritia,
        soldiers : Math.floor(Math.random() * (MAX_PROVINCE_SOLDIERS - MIN_PROVINCE_SOLDIERS) + MIN_PROVINCE_SOLDIERS)
    }, "Pomeria"  : {
        name : "Pomeria",
        countryOwner: Pomeria,
        soldiers : Math.floor(Math.random() * (MAX_PROVINCE_SOLDIERS - MIN_PROVINCE_SOLDIERS) + MIN_PROVINCE_SOLDIERS)
    }, "Stettin"  : {
        name : "Stettin",
        countryOwner: Pomeria,
        soldiers : Math.floor(Math.random() * (MAX_PROVINCE_SOLDIERS - MIN_PROVINCE_SOLDIERS) + MIN_PROVINCE_SOLDIERS)
    }, "Neumark"  : {
        name : "Neumark",
        countryOwner: Pruthenia,
        soldiers : Math.floor(Math.random() * (MAX_PROVINCE_SOLDIERS - MIN_PROVINCE_SOLDIERS) + MIN_PROVINCE_SOLDIERS)
    }, "Lithunia"  : {
        name : "Lithunia",
        countryOwner: Pruthenia,
        soldiers : Math.floor(Math.random() * (MAX_PROVINCE_SOLDIERS - MIN_PROVINCE_SOLDIERS) + MIN_PROVINCE_SOLDIERS)
    }, "Kurland"  : {
        name : "Kurland",
        countryOwner: Pruthenia,
        soldiers : Math.floor(Math.random() * (MAX_PROVINCE_SOLDIERS - MIN_PROVINCE_SOLDIERS) + MIN_PROVINCE_SOLDIERS)
    }, "Lavonia"  : {
        name : "Lavonia",
        countryOwner: Estonia,
        soldiers : Math.floor(Math.random() * (MAX_PROVINCE_SOLDIERS - MIN_PROVINCE_SOLDIERS) + MIN_PROVINCE_SOLDIERS)
    }, "Estonia"  : {
        name : "Estonia",
        countryOwner: Estonia,
        soldiers : Math.floor(Math.random() * (MAX_PROVINCE_SOLDIERS - MIN_PROVINCE_SOLDIERS) + MIN_PROVINCE_SOLDIERS)
    }, "Scania"  : {
        name : "Scania",
        countryOwner: Denmark,
        soldiers : Math.floor(Math.random() * (MAX_PROVINCE_SOLDIERS - MIN_PROVINCE_SOLDIERS) + MIN_PROVINCE_SOLDIERS)
    }, "Sweden"  : {
        name : "Sweden",
        countryOwner: Sweden,
        soldiers : Math.floor(Math.random() * (MAX_PROVINCE_SOLDIERS - MIN_PROVINCE_SOLDIERS) + MIN_PROVINCE_SOLDIERS)
    }, "Vasterbotten"  : {
        name : "Vasterbotten",
        countryOwner: Sweden,
        soldiers : Math.floor(Math.random() * (MAX_PROVINCE_SOLDIERS - MIN_PROVINCE_SOLDIERS) + MIN_PROVINCE_SOLDIERS)
    }, "Norway"  : {
        name : "Norway",
        countryOwner: Norway,
        soldiers : Math.floor(Math.random() * (MAX_PROVINCE_SOLDIERS - MIN_PROVINCE_SOLDIERS) + MIN_PROVINCE_SOLDIERS)
    }, "Suomi"  : {
        name : "Suomi",
        countryOwner: Suomi,
        soldiers : Math.floor(Math.random() * (MAX_PROVINCE_SOLDIERS - MIN_PROVINCE_SOLDIERS) + MIN_PROVINCE_SOLDIERS)
    }, "Black-Rus"  : {
        name : "Black-Rus",
        countryOwner: Rus,
        soldiers : Math.floor(Math.random() * (MAX_PROVINCE_SOLDIERS - MIN_PROVINCE_SOLDIERS) + MIN_PROVINCE_SOLDIERS)
    }, "Podlesia"  : {
        name : "Podlesia",
        countryOwner: Rus,
        soldiers : Math.floor(Math.random() * (MAX_PROVINCE_SOLDIERS - MIN_PROVINCE_SOLDIERS) + MIN_PROVINCE_SOLDIERS)
    }, "Volhynia"  : {
        name : "Volhynia",
        countryOwner: Rus,
        soldiers : Math.floor(Math.random() * (MAX_PROVINCE_SOLDIERS - MIN_PROVINCE_SOLDIERS) + MIN_PROVINCE_SOLDIERS)
    }, "Little-Rus"  : {
        name : "Little-Rus",
        countryOwner: Rus,
        soldiers : Math.floor(Math.random() * (MAX_PROVINCE_SOLDIERS - MIN_PROVINCE_SOLDIERS) + MIN_PROVINCE_SOLDIERS)
    }, "Korsun"  : {
        name : "Korsun",
        countryOwner: Pechenegs,
        soldiers : Math.floor(Math.random() * (MAX_PROVINCE_SOLDIERS - MIN_PROVINCE_SOLDIERS) + MIN_PROVINCE_SOLDIERS)
    }, "Jedisan"  : {
        name : "Jedisan",
        countryOwner: Pechenegs,
        soldiers : Math.floor(Math.random() * (MAX_PROVINCE_SOLDIERS - MIN_PROVINCE_SOLDIERS) + MIN_PROVINCE_SOLDIERS)
    }, "White-Rus"  : {
        name : "White-Rus",
        countryOwner: Rus,
        soldiers : Math.floor(Math.random() * (MAX_PROVINCE_SOLDIERS - MIN_PROVINCE_SOLDIERS) + MIN_PROVINCE_SOLDIERS)
    }, "Smolensk"  : {
        name : "Smolensk",
        countryOwner: Rus,
        soldiers : Math.floor(Math.random() * (MAX_PROVINCE_SOLDIERS - MIN_PROVINCE_SOLDIERS) + MIN_PROVINCE_SOLDIERS)
    }, "Chernigov"  : {
        name : "Chernigov",
        countryOwner: Rus,
        soldiers : Math.floor(Math.random() * (MAX_PROVINCE_SOLDIERS - MIN_PROVINCE_SOLDIERS) + MIN_PROVINCE_SOLDIERS)
    }, "Carelia"  : {
        name : "Carelia",
        countryOwner: Suomi,
        soldiers : Math.floor(Math.random() * (MAX_PROVINCE_SOLDIERS - MIN_PROVINCE_SOLDIERS) + MIN_PROVINCE_SOLDIERS)
    }, "Nyenschantz"  : {
        name : "Nyenschantz",
        countryOwner: Suomi,
        soldiers : Math.floor(Math.random() * (MAX_PROVINCE_SOLDIERS - MIN_PROVINCE_SOLDIERS) + MIN_PROVINCE_SOLDIERS)
    }, "Novgorod"  : {
        name : "Novgorod",
        countryOwner: Rus,
        soldiers : Math.floor(Math.random() * (MAX_PROVINCE_SOLDIERS - MIN_PROVINCE_SOLDIERS) + MIN_PROVINCE_SOLDIERS)
    }, "Moscow"  : {
        name : "Moscow",
        countryOwner: Rus,
        soldiers : Math.floor(Math.random() * (MAX_PROVINCE_SOLDIERS - MIN_PROVINCE_SOLDIERS) + MIN_PROVINCE_SOLDIERS)
    }, "Muscovy"  : {
        name : "Muscovy",
        countryOwner: Rus,
        soldiers : Math.floor(Math.random() * (MAX_PROVINCE_SOLDIERS - MIN_PROVINCE_SOLDIERS) + MIN_PROVINCE_SOLDIERS)
    }, "Poltawa"  : {
        name : "Poltawa",
        countryOwner: Rus,
        soldiers : Math.floor(Math.random() * (MAX_PROVINCE_SOLDIERS - MIN_PROVINCE_SOLDIERS) + MIN_PROVINCE_SOLDIERS)
    }, "Kherson"  : {
        name : "Kherson",
        countryOwner: Cumania,
        soldiers : Math.floor(Math.random() * (MAX_PROVINCE_SOLDIERS - MIN_PROVINCE_SOLDIERS) + MIN_PROVINCE_SOLDIERS)
    }, "Circassia"  : {
        name : "Circassia",
        countryOwner: Cumania,
        soldiers : Math.floor(Math.random() * (MAX_PROVINCE_SOLDIERS - MIN_PROVINCE_SOLDIERS) + MIN_PROVINCE_SOLDIERS)
    }, "Crimea"  : {
        name : "Crimea",
        countryOwner: Crimea,
        soldiers : Math.floor(Math.random() * (MAX_PROVINCE_SOLDIERS - MIN_PROVINCE_SOLDIERS) + MIN_PROVINCE_SOLDIERS)
    }, "Kent"  : {
        name : "Kent",
        countryOwner: England,
        soldiers : Math.floor(Math.random() * (MAX_PROVINCE_SOLDIERS - MIN_PROVINCE_SOLDIERS) + MIN_PROVINCE_SOLDIERS)
    }, "Bath"  : {
        name : "Bath",
        countryOwner: England,
        soldiers : Math.floor(Math.random() * (MAX_PROVINCE_SOLDIERS - MIN_PROVINCE_SOLDIERS) + MIN_PROVINCE_SOLDIERS)
    }, "Wales"  : {
        name : "Wales",
        countryOwner: Wales,
        soldiers : Math.floor(Math.random() * (MAX_PROVINCE_SOLDIERS - MIN_PROVINCE_SOLDIERS) + MIN_PROVINCE_SOLDIERS)
    }, "Oxford"  : {
        name : "Oxford",
        countryOwner: England,
        soldiers : Math.floor(Math.random() * (MAX_PROVINCE_SOLDIERS - MIN_PROVINCE_SOLDIERS) + MIN_PROVINCE_SOLDIERS)
    }, "Essex"  : {
        name : "Essex",
        countryOwner: England,
        soldiers : Math.floor(Math.random() * (MAX_PROVINCE_SOLDIERS - MIN_PROVINCE_SOLDIERS) + MIN_PROVINCE_SOLDIERS)
    }, "York"  : {
        name : "York",
        countryOwner: England,
        soldiers : Math.floor(Math.random() * (MAX_PROVINCE_SOLDIERS - MIN_PROVINCE_SOLDIERS) + MIN_PROVINCE_SOLDIERS)
    }, "Leix"  : {
        name : "Leix",
        countryOwner: Leix,
        soldiers : Math.floor(Math.random() * (MAX_PROVINCE_SOLDIERS - MIN_PROVINCE_SOLDIERS) + MIN_PROVINCE_SOLDIERS)
    }, "Munster"  : {
        name : "Munster",
        countryOwner: Leix,
        soldiers : Math.floor(Math.random() * (MAX_PROVINCE_SOLDIERS - MIN_PROVINCE_SOLDIERS) + MIN_PROVINCE_SOLDIERS)
    }, "Connaught"  : {
        name : "Connaught",
        countryOwner: Muaidhe,
        soldiers : Math.floor(Math.random() * (MAX_PROVINCE_SOLDIERS - MIN_PROVINCE_SOLDIERS) + MIN_PROVINCE_SOLDIERS)
    }, "Ulster"  : {
        name : "Ulster",
        countryOwner: Muaidhe,
        soldiers : Math.floor(Math.random() * (MAX_PROVINCE_SOLDIERS - MIN_PROVINCE_SOLDIERS) + MIN_PROVINCE_SOLDIERS)
    }, "Durham"  : {
        name : "Durham",
        countryOwner: England,
        soldiers : Math.floor(Math.random() * (MAX_PROVINCE_SOLDIERS - MIN_PROVINCE_SOLDIERS) + MIN_PROVINCE_SOLDIERS)
    }, "Scotland"  : {
        name : "Scotland",
        countryOwner: Scotland,
        soldiers : Math.floor(Math.random() * (MAX_PROVINCE_SOLDIERS - MIN_PROVINCE_SOLDIERS) + MIN_PROVINCE_SOLDIERS)
    }, "Iceland"  : {
        name : "Iceland",
        countryOwner: Iceland,
        soldiers : Math.floor(Math.random() * (MAX_PROVINCE_SOLDIERS - MIN_PROVINCE_SOLDIERS) + MIN_PROVINCE_SOLDIERS)
    }
};

let flagFile = document.getElementById("flagFile");

flagFile.addEventListener("change", function() {
  showImage(this);
});

// display chosen flag
function showImage(input) {
  var reader;
  if (input.files && input.files[0]) {
    reader = new FileReader();
    reader.onload = function(e) {
      document.getElementById("flagPreviewTitle").setAttribute('src', e.target.result);
      document.getElementById("flagPreviewGame").setAttribute('src', e.target.result);
      playerCountry.flagUrl = e.target.result;
    }
    reader.readAsDataURL(input.files[0]);
    flagPreviewTitle.style.display = "block";
    // after image is selected enable start button
    document.getElementById("confirmInfo").disabled = false;
  }
}

// show actual menu screen
function showInputScreen() {
    var audio = new Audio('media/backrgoundmusic.mp3');
    audio.play();
    audio.loop = true;
    audio.volume = 0.05;
    document.getElementById("startScreen").style.display = "none";
    document.getElementById("initialScreen").style.display = "block";

    // setup icon selection:
    // on click, save icon selection, apply deselect to everything, then reset display of chosen icon
    for(let iconColDiv of document.getElementsByClassName("iconCol")) {
        for (let iconImg of iconColDiv.getElementsByTagName("img")) {
            iconImg.onclick = function() {
                iconChosen = this.getAttribute('id');
                // apply deslect to all elements
                deselectAllIconChoices();
                // reset this style
                this.style.opacity = "1";
            };
        }
    }
}

function deselectAllIconChoices() {
    for(let iconColDiv of document.getElementsByClassName("iconCol")) {
        for (let iconImg of iconColDiv.getElementsByTagName("img")) {
            iconImg.style.opacity = "0.5";
        }
    }
}

// confirm details are correct
function confirmInfo() {
    // TODO WE NEED TO SCROLLL DOWWW NTHEn
    // process input choices
    initialRulerName = document.getElementById("inputRulerName").value.trim();
    playerCountry.dynastyName = document.getElementById("dynastyName").value;
    playerCountry.name = document.getElementById("countryName").value.trim();
    playerCountry.color = document.getElementById("colorPick").value;
    document.getElementById("confirmStartText").textContent = "Start as Count " +initialRulerName+" of "+playerCountry.name+" from House "+playerCountry.dynastyName+"?";
    document.getElementById("confirmStartDiv").style.display = "block";
}

// start game
function loadGame() {
    // swap initial and game screens
    const initialScreen = document.getElementById("initialScreen");
    initialScreen.style.display = "none";
    const gameScreen = document.getElementById("gameScreen");
    gameScreen.style.display = "block";

    // setup family
    // todo determeien ruler geneder based on choice...
    let gender;
    if (iconChosen === "king_1_choice" || iconChosen === "king_2_choice" || iconChosen === "king_3_choice") {
        gender = M_GENDER;
    } else if (iconChosen === "queen_1_choice" || iconChosen === "queen_2_choice" || iconChosen === "queen_3_choice") {
        gender = F_GENDER;
    }
    currentRuler = new Character(initialRulerName, INITIAL_RULER_AGE, INITIAL_RULER_SKILL_LEVEL, iconChoices[iconChosen], gender);
    currentRuler.spouse = playerCountry;
    currentRuler.iconSet = true;

    currentHeir = new Character("Henry", 0, Math.floor(Math.random()*3)+1, babyIcons[M_GENDER], M_GENDER);
    // add another child
    currentRuler.children.push(currentHeir);
    currentRuler.children.push(new Character("Elizabeth", 0, Math.floor(Math.random()*3)+1, babyIcons[F_GENDER], F_GENDER));


    // setup initial values in ui
    document.getElementById("rulerNameUI").textContent = getDynastyRankString() +" "+ initialRulerName +" of "+ playerCountry.name;
    document.getElementById("rulerIcon").src = currentRuler.iconUrl;
    document.getElementById("dynastyNameDisplay").textContent = "House " + playerCountry.dynastyName;
    document.getElementById("age").textContent = "Age: " + INITIAL_RULER_AGE;
    document.getElementById("dynastyRank").textContent = "Rank: " + getDynastyRankString();
    document.getElementById("skillLevel").textContent = "Skill: " + INITIAL_RULER_SKILL_LEVEL;
    document.getElementById("actionCount").textContent = "Actions: " + actionsTaken + "/" + INITIAL_RULER_SKILL_LEVEL;
    document.getElementById("playerOwnedSoldiers").textContent = "Soldiers :"+playerSoldiers;
    document.getElementById("currentYear").textContent = "Year: " + currentYear;
    // set chosen region to something for now
    chosenRegion = regions[DEFAULT_STARTING_REGION];

    // set up initial province view
    document.getElementById("regionSoldiers").textContent = "Soldiers: " + chosenRegion.soldiers;
    document.getElementById("regionCountryOpinion").textContent = "Opinion: " + getTrueOpinion(chosenRegion);
    document.getElementById("regionOwnerFlag").src = chosenRegion.countryOwner.flagUrl;
    document.getElementById("regionOwnerName").textContent = chosenRegion.countryOwner.name;
    document.getElementById("regionDynastyName").textContent = "House " + chosenRegion.countryOwner.dynastyName;
    document.getElementById("regionName").textContent = chosenRegion.name;
    document.getElementById("provinceSelectText").textContent = "Selected Province/Country: " + chosenRegion.name;

    // changeRegionControl(regions[DEFAULT_STARTING_REGION], playerCountry);
    // document.getElementById("Baden").style.fill = playerCountry.color;
    document.getElementById("actionCount").textContent = "Actions: " + actionsTaken + "/" + INITIAL_RULER_SKILL_LEVEL;
    // forcing all actions to be disabled
    toggleTurnActions(false);
    document.getElementById("endTurn").disabled = true;
    // TOO SET TO TRUE FOR PRODUCTION. JUST TESTING
    // document.getElementById("endTurn").disabled = false;

    // set onclick for all svg objects in regions group
    let svgRegions = document.getElementById("regions").children;
    for (let province of svgRegions) {
        province.onclick = function() {
            let regionName = this.getAttribute('id');
            chosenRegion = regions[regionName];
            let regionOwner = chosenRegion.countryOwner;
            // if owned by us, hide soldiers and opinion (no need)
            // TODDO ADD HOUSE/DYNASTY NAMES (House Bean. or Bean Dynasty of the Kingdom of France)
            if (regionOwner === playerCountry) {
                document.getElementById("regionSoldiers").style.display = "none";
                document.getElementById("regionCountryOpinion").style.display = "none";
            } else {
                document.getElementById("regionSoldiers").style.display = "block";
                document.getElementById("regionCountryOpinion").style.display = "block";
                document.getElementById("regionSoldiers").textContent = "Soldiers: " + chosenRegion.soldiers;
                document.getElementById("regionCountryOpinion").textContent = "Opinion: " + getTrueOpinion(chosenRegion);
            }
            document.getElementById("regionOwnerFlag").src = regionOwner.flagUrl;
            document.getElementById("regionOwnerName").textContent = regionOwner.name;
            document.getElementById("regionDynastyName").textContent = "House " + regionOwner.dynastyName;
            document.getElementById("regionName").textContent = regionName;
            document.getElementById("provinceSelectText").textContent = "Selected Province/Country: " + regionName;
            document.getElementById("provinceInfo").style.display = "block";
        };
    }

    closeProvinceViewButton.onclick = function () {
        document.getElementById("provinceInfo").style.display = "none";
    };

    // choose initial province, then allow actions
    document.getElementById("regionSelectCancel").style.display = "none";
    document.getElementById("regionSelectBottomBar").style.display = "block";
    document.getElementById("regionSelectConfirm").onclick = function() {
        // keep track of current incase another one is clicked while processing.
        let currChosenRegion = chosenRegion;
        changeRegionControl(currChosenRegion, playerCountry);
        document.getElementById("regionSelectCancel").style.display = "inline";
        document.getElementById("initialProvinceSelectPrompt").style.display = "none";
        document.getElementById("regionSelectBottomBar").style.display = "none";
        toggleTurnActions(true);
    };
}

// add more soldiers
function trainSoldiers() {
    showEventDialog("./media/trainedSoldiers.jpg",
        "You recruited: " + SOLDIERS_TRAIN_AMOUNT + " soldiers!",
        "May they bring us glory.");
    // update all values
    document.getElementById("endEventButton1").onclick = function() {
        document.getElementById("eventDialog").style.display = "none";
        playerSoldiers += SOLDIERS_TRAIN_AMOUNT;
        document.getElementById("playerOwnedSoldiers").textContent = "Soldiers :"+playerSoldiers;
        // updates to new opinion
        updateCurrentlyShownProvince();
        incrementActionsTaken();
    };
}

// attack another province
// TODO IF YOU CAPTURE A PROVINCE AND ENOUGH TO RANK UP, TRIGGER RAANK UP SCREEN.
function attack() {
    // disable turn actions while processing popup
    toggleTurnActions(false);
    // TODO if region name is defined
    document.getElementById("regionSelectBottomBar").style.display = "block";
    document.getElementById("regionSelectCancel").onclick = function() {
        document.getElementById("regionSelectBottomBar").style.display = "none";
        toggleTurnActions(true);
    };
    // todo increase turn action count
    document.getElementById("regionSelectConfirm").onclick = function() {
        // keep track of current incase another one is clicked while processing.
        let currChosenRegion = chosenRegion;
        if (currChosenRegion && (currChosenRegion.countryOwner !== playerCountry)) {
            // hide region select
            document.getElementById("regionSelectBottomBar").style.display = "none";

            showEventDialog("./media/attackFromEnemy.png",
                "You are about to attack the "+currChosenRegion.countryOwner.name+"'s castle in "+currChosenRegion.name+". They have "+currChosenRegion.soldiers+" soldiers in this location, and you have "+playerSoldiers+" soldiers total. You will lose "+OPINION_LOSS_ATTACK+" Opinion from attacking. Are you sure you want to invade?",
                "Continue",
                "Cancel");

            showSoldierInputValue();
            // trigger victory/loss dialog
            // if ranked up, show rank up screen (aand maybe show gameover if rankedup high enough)
            // TODO choose the mount you're sending
            document.getElementById("endEventButton1").onclick = function() {
                if (validSoldierInput()) {
                    let results = calculateBattleResults(currChosenRegion.soldiers);
                    playerSoldiers -= results.friendlyLosses;
                    currChosenRegion.soldiers -= results.enemyLosses;
                    document.getElementById("playerOwnedSoldiers").textContent = "Soldiers :"+playerSoldiers;
                    // out of the surviving active combat members, whoever is higher wins the battle
                    // if the invader is wins, they take province. otherwise nothing happens.
                    if (results.remainingSoldiersSent > results.remainingEnemySoldiers) {
                        showEventDialog("./media/victoryBattle.jpg",
                            "Your soldiers fought valiantly, and won! "+currChosenRegion.name+" is yours! The enemy still has "+results.remainingEnemySoldiers+" men remaining, compared to your "+results.remainingSoldiersSent+" soldiers sent remaining. You lost "+results.friendlyLosses+" soldiers, and the enemy lost "+results.enemyLosses+"!",
                            "Continue");
                        document.getElementById("endEventButton1").onclick = function() {
                            document.getElementById("playerOwnedSoldiers").textContent = "Soldiers :"+playerSoldiers;
                            changeRegionControl(currChosenRegion, playerCountry);
                            changeOpinion(OPINION_LOSS_ATTACK, currChosenRegion.countryOwner);
                            if (Object.keys(provincesOwned).length === getRequiredProvinces()) {
                                // if ranking up, rank up. if you become the holy roman emperor, win game
                                // todo, should be able to look around map and family tree
                                dynastyRank++;
                                if (!becameHolyRomanEmperor()) {
                                    showEventDialog("./media/rankup.jpg",
                                        "The realm rejoices! Despite all challenges, your dynasty House "+playerCountry.dynastyName+" continues to expand! You have ranked up to a "+getDynastyRankString()+"!",
                                        "Continue");
                                    document.getElementById("endEventButton1").onclick = function() {
                                        document.getElementById("eventDialog").style.display = "none";
                                        incrementActionsTaken();
                                    };
                                }
                            } else {
                                document.getElementById("eventDialog").style.display = "none";
                                // if no need to rank up
                                incrementActionsTaken();
                            }
                        };
                    } else {
                        // defeat
                        showEventDialog("./media/defeatBattle.png",
                            "Your soldiers fought valiantly, but were defeated! The enemy still has "+remainingEnemySoldiers+" men remaining, compared to your "+remainingSoldiersSent+" soldiers sent remaining. You lost "+friendlyLosses+" soldiers, and the enemy lost "+enemyLosses+"!",
                            "Continue");
                        changeOpinion(OPINION_LOSS_ATTACK, currChosenRegion.countryOwner);
                        document.getElementById("endEventButton1").onclick = function() {
                            document.getElementById("playerOwnedSoldiers").textContent = "Soldiers :"+playerSoldiers;
                            document.getElementById("eventDialog").style.display = "none";
                            incrementActionsTaken();
                        };
                    }
                }
            };
            // on cancel just reset everything
            document.getElementById("endEventButton2").onclick = function() {
                document.getElementById("eventDialog").style.display = "none";
                toggleTurnActions(true);
            };
        } else if (currChosenRegion && (currChosenRegion.countryOwner === playerCountry)) {
            // selected a region that you own
            document.getElementById("provinceSelectText").textContent = "Error: Can't select a region you control!";
        }
    };
}

// increase skill level of child
function educateChild() {
    // show family tree with educateChild contexts/conditions for checking what's a valid choice
    showFamilyTree(EDUCATE_CHILD_CONDITION, "Educate Child");

    document.getElementById("treeCancel").onclick = function() {
            resetFamilyTree();
            // renable turn actions on close
            toggleTurnActions(true);
    };
    document.getElementById("treeConfirm").onclick = function() {
        // if nothing was selected, give error message
        // otherwise finish confirmation
        if (validMemberSelected(false)) {
            selectedMemberWrapper.member.skillLevel++;
            resetFamilyTree();

            incrementActionsTaken();
        }
    };
}

// marry off unmarried family member
function arrangeMarriage() {
    showFamilyTree(ARRANGE_MARRIAGE_CONDITION, "Arrange Marriage");

    document.getElementById("treeCancel").onclick = function() {
            resetFamilyTree();
            // renable turn actions on close
            toggleTurnActions(true);
    };
    // todo edit this for marriage
    document.getElementById("treeConfirm").onclick = function() {
        // if nothing was selected, give error message
        // otherwise finish confirmation
        if (validMemberSelected(false)) {
            // keep reference to chosen member for next part
            let memberMarrying = selectedMemberWrapper.member;
            resetFamilyTree();

            document.getElementById("regionSelectBottomBar").style.display = "block";
            document.getElementById("regionSelectCancel").onclick = function() {
                document.getElementById("regionSelectBottomBar").style.display = "none";
                toggleTurnActions(true);
            };
            // todo increase turn action count
            document.getElementById("regionSelectConfirm").onclick = function() {
                // keep track of current incase another one is clicked while processing.
                let currChosenRegion = chosenRegion;
                if (currChosenRegion && (currChosenRegion.countryOwner !== playerCountry)) {
                    // reset display
                    document.getElementById("regionSelectBottomBar").style.display = "none";

                    showEventDialog("./media/marriage.png",
                        "Congratulations! "+memberMarrying.name+" has married a noble from the "+currChosenRegion.countryOwner.name+"! May their descendants be glorious! You gain "+OPINION_GAIN_MARRIAGE+" Opinion!",
                        "Continue");
                    document.getElementById("endEventButton1").onclick = function() {
                        memberMarrying.spouse = currChosenRegion.countryOwner;
                        changeOpinion(OPINION_GAIN_MARRIAGE, currChosenRegion.countryOwner);
                        document.getElementById("eventDialog").style.display = "none";
                        incrementActionsTaken();
                    };
                } else if (currChosenRegion && (currChosenRegion.countryOwner === playerCountry)) {
                    // selected a region that you own
                    document.getElementById("provinceSelectText").textContent = "Error: Can't select a region you control!";
                }
            };
        }
    };
}

// change current ruler or heir
function changeRulerHeir() {
    showFamilyTree(CHANGE_HEIR_CONDITION, "Change Heir");
    document.getElementById("treeCancel").onclick = function() {
            resetFamilyTree();
            // renable turn actions on close
            toggleTurnActions(true);
    };
    document.getElementById("treeConfirm").onclick = function() {
        // if nothing was selected, give error message
        // otherwise finish confirmation
        if (validMemberSelected(false)) {
            // update current heir
            currentHeir = selectedMemberWrapper.member;
            resetFamilyTree();

            incrementActionsTaken();
        }
    };
}

// ask province to become a vassal (depends on opinion)
function askVassal() {
    // TODO increase action consumed once confirmed
    // disable turn actions while processing popup
    toggleTurnActions(false);
    // TODO if region name is defined
    document.getElementById("regionSelectBottomBar").style.display = "block";
    document.getElementById("regionSelectCancel").onclick = function() {
        document.getElementById("regionSelectBottomBar").style.display = "none";
        toggleTurnActions(true);
    };
    // todo increase turn action count
    document.getElementById("regionSelectConfirm").onclick = function() {
        // keep track of current incase another one is clicked while processing.
        let currChosenRegion = chosenRegion;
        if (currChosenRegion && (currChosenRegion.countryOwner !== playerCountry)) {
            // reset region display
            document.getElementById("regionSelectBottomBar").style.display = "none";

            showEventDialog("./media/askingVassal.jpg",
                "You can ask the local lord at "+currChosenRegion.name+" to become your vassal. If the province + nation's opinion is >= "+OPINION_REQUIRED_VASSAL+" you will own the province. Having more soldiers increases province opinion, marrying increases national opinion but attacking decreases national opinion. Their Opinion: "+getTrueOpinion(currChosenRegion)+".",
                "Continue");
            // trigger victory/loss dialog
            // if ranked up, show rank up screen (aand maybe show gameover if rankedup high enough)
            document.getElementById("endEventButton1").onclick = function() {
                //  if opinion is high enough, then you gain control of province
                if (getTrueOpinion(currChosenRegion) >= OPINION_REQUIRED_VASSAL) {
                    showEventDialog("./media/successVassal.png",
                        "Rejoice! The noblemen of "+currChosenRegion.name+" have joined your cause!",
                        "Continue");
                    document.getElementById("endEventButton1").onclick = function() {
                        changeRegionControl(currChosenRegion, playerCountry);
                        if (Object.keys(provincesOwned).length === getRequiredProvinces()) {
                            // if ranking up, rank up. if you become the holy roman emperor, win game
                            // todo, should be able to look around map and family tree
                            dynastyRank++;
                            if (!becameHolyRomanEmperor()) {
                                showEventDialog("./media/rankup.jpg",
                                    "The realm rejoices! Despite all challenges, your dynasty House "+playerCountry.dynastyName+" continues to expand! You have ranked up to a "+getDynastyRankString()+"!",
                                    "Continue");
                                document.getElementById("endEventButton1").onclick = function() {
                                    document.getElementById("eventDialog").style.display = "none";
                                    incrementActionsTaken();
                                };
                            }
                        } else {
                            document.getElementById("eventDialog").style.display = "none";
                            // if no need to rank up
                            incrementActionsTaken();
                        }
                    };
                } else {
                    // else, display error message that it's not high enough.
                    document.getElementById("eventErrorText").style.display = "block";
                    document.getElementById("eventErrorText").textContent = "Error: Their opinion of you is not equal or higher to: "+OPINION_REQUIRED_VASSAL+"! Click Cancel";
                }
            };
            document.getElementById("endEventButton2").style.display = "block";
            document.getElementById("endEventButton2").textContent = "Cancel";
            // on cancel just reset everything
            document.getElementById("endEventButton2").onclick = function() {
                document.getElementById("eventDialog").style.display = "none";
                toggleTurnActions(true);
            };
        } else if (currChosenRegion && (currChosenRegion.countryOwner === playerCountry)) {
            // selected a region that you own
            document.getElementById("provinceSelectText").textContent = "Error: Can't select a region you control!";
        }
    };
}
// see family tree without consuming an action
function viewFamilyTree() {
    showFamilyTree(VIEW_FAMILY_TREE_CONDITION, "Family Tree");
    document.getElementById("treeConfirm").style.display = "none";
    document.getElementById("treeCancel").onclick = function() {
            resetFamilyTree();
            // renable turn actions on close if not end turn
            // if end turn then disable all and reenaable this
            resetAllActions();
    };
}

// end turntrigger once a year event:
function endTurn() {
    document.getElementById("endTurn").disabled = true;

    let WEIGHTS = {
        "deathByAccident": DEATH_BY_ACCIDENT_EVENT_CHANCE,
        "soldiersBetray": SOLDIERS_BETRAY_EVENT_CHANCE,
        "soldiersDefect": SOLDIERS_DEFECT_EVENT_CHANCE,
        "enemyAttack": ENEMY_ATTACK_EVENT_CHANCE,
        "rebellion": REBELLION_EVENT_CHANCE,
        "renowedTeacher": RENOWED_TEACHER_EVENT_CHANCE,
        "crusade": CRUSADE_EVENT_CHANCE,
        "diseaseKillsMember": DISEASE_KILLS_MEMBER_EVENT_CHANCE,
        "diseaseKillsSoldiers": DISEASE_KILLS_SOLDIERS_EVENT_CHANCE,
        "assassinationByMember": ASSASSINATION_BY_MEMBER_EVENT_CHANCE,
        "assassinationByDynasty": ASSASSINATION_BY_DYNASTY_EVENT_CHANCE,
        "failedAssassination": FAILED_ASSASSINATION_EVENT_CHANCE,
        "deathSoldiersHygiene":DEATH_SOLDIERS_HYGIENE_EVENT_CHANCE,
    };

    // if here's no children to educate, don't trigger renowed teacher event
    if (!hasChildrenToEducate()) {
        delete WEIGHTS["renowedTeacher"];
    }
    let randomChoice = weightedRandomChoice(WEIGHTS);
    // TODO SWAP TO WEIGHTED RANDOM CHOICE (this is just debugging)
    // let randomChoice = "crusade";
    if (randomChoice === "deathByAccident") {
        // Death of Family Member due to accident
        let aliveMembers = [];
        for (let memberId in familyMembers) {
            let famMember = familyMembers[memberId];
            if (famMember.isAlive) {
                aliveMembers.push(famMember);
            }
        }
        let deadMember = aliveMembers[Math.floor(Math.random()*aliveMembers.length)];
        deadMember.isAlive = false;
        // different text depending if YOU died or someone else
        let eventText = "";
        if (deadMember === currentRuler) {
            eventText = "While traveling in the country, you lost control of your horse and fell into a nearby river, drowning in the process.";
        } else {
            eventText = "While traveling in the country, "+deadMember.name+" lost control of their horse and fell into a nearby river, drowning in the process.";
        }
        showEventDialog("./media/deathByAccident.png",
            eventText,
            "Continue");
        document.getElementById("endEventButton1").onclick = function() {
            document.getElementById("eventDialog").style.display = "none";
            showDeathDialog([deadMember], ageIncreasePhase);
        };
    }
    else if (randomChoice === "soldiersBetray") {
        // Soldier betray you and join someone else
        const regionIds = Object.keys(regions);
        let randomRegionId = regionIds[Math.floor(regionIds.length*Math.random())];
        let randomRegion = regions[randomRegionId];
        // keep looping until we find a random province we don't own
        while (randomRegion.countryOwner === playerCountry) {
            randomRegionId = regionIds[Math.floor(regionIds.length*Math.random())];
            randomRegion = regions[randomRegionId];
        }
        // give that region a random amount of soldiers we own. increase their number and decrease this one
        // select mininum of eihter soldiers player owns (or half, third, depends on betray percentage)
        //    or random soldiers in range of min to max
        // (we do random * (max-min) + min to create a random for random in javascript), then turn it into an even multiple)
        let soldiersDefecting = Math.min(Math.ceil(playerSoldiers*MAX_SOLDIERS_BETRAY_PERCENTAGE), Math.round((Math.random()*(MAX_SOLDIERS_BETRAY-MIN_SOLDIERS_BETRAY)+MIN_SOLDIERS_BETRAY)/SOLDIERS_EVENT_MULTIPLE) * SOLDIERS_EVENT_MULTIPLE);
        playerSoldiers -= soldiersDefecting;
        document.getElementById("playerOwnedSoldiers").textContent = "Soldiers :"+playerSoldiers;
        randomRegion.soldiers += soldiersDefecting;

        showEventDialog("./media/soldiersBetrayYou.png",
            "Due to your oppressive rule, "+soldiersDefecting+" military units have defected to the province of "+randomRegion.name+" owned by the "+randomRegion.countryOwner.name+".",
            "Continue");
        document.getElementById("endEventButton1").onclick = function() {
            document.getElementById("eventDialog").style.display = "none";
            document.getElementById("playerOwnedSoldiers").textContent = "Soldiers :"+playerSoldiers;
            // update open province view if it's this random region
            if (chosenRegion === randomRegion) {
                updateCurrentlyShownProvince();
            }
            // move directly to increase age and true end turn
            ageIncreasePhase();
        };
    } else if (randomChoice === "soldiersDefect") {
        // Soldiers defect to your cause
        const regionIds = Object.keys(regions);
        let randomRegionId = regionIds[Math.floor(regionIds.length*Math.random())];
        let randomRegion = regions[randomRegionId];
        // keep looping until we find a random province we don't own
        while (randomRegion.countryOwner === playerCountry) {
            randomRegionId = regionIds[Math.floor(regionIds.length*Math.random())];
            randomRegion = regions[randomRegionId];
        }
        // give us a random amount of soldiers from random province. increase our number and decrease theirs
        // select mininum of eihter total soldiers in region or random soldiers in range of min to max
        // (we do random * (max-min) + min to create a random for random in javascript), then turn it into an even multiple)
        let soldiersDefecting = Math.min(Math.ceil(randomRegion.soldiers*MAX_SOLDIERS_BETRAY_PERCENTAGE), Math.round((Math.random()*(MAX_SOLDIERS_BETRAY-MIN_SOLDIERS_BETRAY)+MIN_SOLDIERS_BETRAY)/SOLDIERS_EVENT_MULTIPLE) * SOLDIERS_EVENT_MULTIPLE);
        playerSoldiers += soldiersDefecting;
        randomRegion.soldiers -= soldiersDefecting;
document.getElementById("playerOwnedSoldiers").textContent = "Soldiers :"+playerSoldiers;

        showEventDialog("./media/soldiersDefectToYou.png",
            "Due to the oppressive rule of the "+randomRegion.countryOwner.name+" in "+randomRegion.name+", "+soldiersDefecting+" military units have defected to your cause!",
            "Continue");

        document.getElementById("endEventButton1").style.display = "block";
        document.getElementById("endEventButton1").value = "Continue";
        document.getElementById("endEventButton1").onclick = function() {
            document.getElementById("playerOwnedSoldiers").textContent = "Soldiers :"+playerSoldiers;
            document.getElementById("eventDialog").style.display = "none";
            // update open province view if it's this random region
            if (chosenRegion === randomRegion) {
                updateCurrentlyShownProvince();
            }
            // move directly to increase age and true end turn
            ageIncreasePhase();
        };
    } else if (randomChoice === "enemyAttack") {
        // Attack from random enemy
        // their force is equal to the 50% of your initial starting amount

        // select random province you own
        let provinceKeys = Object.keys(provincesOwned);
        let randomProvinceId = provinceKeys[Math.floor(provinceKeys.length*Math.random())];
        let randomProvince = provincesOwned[randomProvinceId];

        // select random nation, and assign it's soldier strength
        // (hard coded to skip rebels since they're the fist element in array)
        let randomNation = countries[Math.floor((countries.length-1)*Math.random())+1];
        let enemySoldiers = Math.round((playerSoldiers * ENEMY_INVASION_STRENGTH_RATIO));

        showEventDialog("./media/attackFromEnemy.png",
            "The "+randomNation.name+" is invading your province of "+randomProvince.name+" with "+enemySoldiers+" soldiers, you must mount a defense!",
            "Continue");
        // TODO flavor is supposed to be HOUSE not NATION. House of X not nation of X (must fix everywhere)
        document.getElementById("eventInputValue").style.display = "inline-block";
        // reset value from previous amount
        document.getElementById("eventInputValue").value = "";
        document.getElementById("eventInputValue").placeholder = "Enter Soldiers <= Total Amount";
        document.getElementById("inputLabel").style.display = "block";
        document.getElementById("inputLabel").textContent = "Number of soldiers to send: ";
        // check if battle won, if not then lose province and add province to invading nation
        // then check if game over if no more provinces are left
        document.getElementById("endEventButton1").onclick = function() {
            if (validSoldierInput()) {
                let results = calculateBattleResults(enemySoldiers);
                playerSoldiers -= results.friendlyLosses;
                enemySoldiers -= results.enemyLosses;
document.getElementById("playerOwnedSoldiers").textContent = "Soldiers :"+playerSoldiers;
                // if we won the battle, just have soldiers count go down
                if (results.remainingSoldiersSent >= results.remainingEnemySoldiers) {
                    showEventDialog("./media/victoryBattle.jpg",
                        "Your soldiers fought valiantly, and defeated the invasion! You lost: "+results.friendlyLosses+" soldiers!",
                        "Continue");

                    document.getElementById("endEventButton1").onclick = function() {
                        document.getElementById("playerOwnedSoldiers").textContent = "Soldiers :"+playerSoldiers;
                        document.getElementById("eventDialog").style.display = "none";
                        ageIncreasePhase();
                    };
                } else {
                    // invaders win. give them province with soldiers = what they had, and check if game lose
                    showEventDialog("./media/defeatBattle.png",
                        "Defeat! The invaders won! You lost the province of "+randomProvince.name+" and "+results.friendlyLosses+" soldiers!",
                        "Continue");
                    document.getElementById("endEventButton1").onclick = function() {
                        changeRegionControl(randomProvince, randomNation);
                        randomProvince.soldiers = enemySoldiers;
                        // if there's no more provinces left, game is lost
                        if (Object.keys(provincesOwned).length === 0) {
                            showEventDialog("./media/gameOver.jpg",
                               "You lost all your provinces, so your dynasty of "+playerCountry.name+" failed! GAME OVER");
                            // disable button, game over
                            document.getElementById("endEventButton1").style.display = "none";
                        } else {
                            document.getElementById("eventDialog").style.display = "none";
                            ageIncreasePhase();
                        }
                        document.getElementById("playerOwnedSoldiers").textContent = "Soldiers :"+playerSoldiers;
                    };
                }
            }
        };
    } else if (randomChoice === "rebellion") {
        // Rebellion
        // spawn soldiers 20% of size, if they lose battle province is lost and joins rebellion!
        // select random province
        let provinceKeys = Object.keys(provincesOwned);
        let randomProvinceId = provinceKeys[Math.floor(provinceKeys.length*Math.random())];
        let randomProvince = provincesOwned[randomProvinceId];

        let rebelSoldiers = Math.round((playerSoldiers * REBELLION_STRENGTH_PERCENTAGE));

        showEventDialog("./media/rebellionStart.png",
            "Angered by your tyranny, the people have risen up in "+randomProvince.name+", with "+rebelSoldiers+" soldiers! Send soldiers to quell the violence! If you fail, you will lose the province to the "+Rebels.name+"!",
            "Continue");

        document.getElementById("eventInputValue").style.display = "inline-block";
        // reset value from previous amount
        document.getElementById("eventInputValue").value = "";
        document.getElementById("eventInputValue").placeholder = "Enter Soldiers <= Total Amount";
        document.getElementById("inputLabel").style.display = "block";
        document.getElementById("inputLabel").textContent = "Number of soldiers to send: ";
        // check if battle won, if not then lose province and add province to rebel faction
        // then check if game over if no more provinces are left
        document.getElementById("endEventButton1").onclick = function() {
            if (validSoldierInput()) {
                let results = calculateBattleResults(rebelSoldiers);
                playerSoldiers -= results.friendlyLosses;
document.getElementById("playerOwnedSoldiers").textContent = "Soldiers :"+playerSoldiers;
                rebelSoldiers -= results.enemyLosses;
                // if we won the battle, just have soldiers count go down
                if (results.remainingSoldiersSent >= results.remainingEnemySoldiers) {
                    showEventDialog("./media/victoryBattle.jpg",
                        "Your soldiers fought valiantly, and defeated the rebellion! You lost: "+results.friendlyLosses+" soldiers!",
                        "Continue");
                    document.getElementById("endEventButton1").onclick = function() {
                        document.getElementById("playerOwnedSoldiers").textContent = "Soldiers :"+playerSoldiers;
                        document.getElementById("eventDialog").style.display = "none";
                        ageIncreasePhase();
                    };
                } else {
                    // rebels win. give them province with soldiers = what they had, and check if game lose
                    showEventDialog("./media/defeatBattle.png",
                        "Defeat! The rebels won! You lost the province of "+randomProvince.name+" and "+results.friendlyLosses+" soldiers!",
                        "Continue");
                    document.getElementById("endEventButton1").onclick = function() {
                        changeRegionControl(randomProvince, Rebels);
                        randomProvince.soldiers = rebelSoldiers;
                        // if there's no more provinces left, game is lost
                        if (Object.keys(provincesOwned).length === 0) {
                            showEventDialog("./media/gameOver.jpg",
                               "You lost all your provinces, so your dynasty of "+playerCountry.name+" failed! GAME OVER");
                            // disable button, game over
                            document.getElementById("endEventButton1").style.display = "none";
                        } else {
                            document.getElementById("eventDialog").style.display = "none";
                            ageIncreasePhase();
                        }
                        document.getElementById("playerOwnedSoldiers").textContent = "Soldiers :"+playerSoldiers;
                    };
                }
            }
        };
    } else if (randomChoice === "renowedTeacher") {
        // Renowned teacher joins your court (+1 to skill level of a select child for free)
        // it can go over lvl 5 limit
        showEventDialog("./media/teacherArrives.png",
            "A great teacher has decided to join your royal court to educate the next generation's rulers of House "+playerCountry.dynastyName+"! The selected child will earn +1 Skill Level (and ignore level cap of "+MAX_SKILL_LEVEL+").",
            "Continue");
        document.getElementById("endEventButton1").onclick = function() {
            document.getElementById("eventDialog").style.display = "none";

            showFamilyTree(RENOWED_TEACHER_CONDITION, "Select Child to Educate");
            document.getElementById("treeCancel").onclick = function() {
                    resetFamilyTree();
                    // move on to next turn
                    ageIncreasePhase();
            };
            document.getElementById("treeConfirm").onclick = function() {
                // check if valid member chosen, but not force user to select anything
                if (validMemberSelected(false)) {
                    selectedMemberWrapper.member.skillLevel++;
                    resetFamilyTree();
                    ageIncreasePhase();
                }
            };
        };
    } else if (randomChoice === "crusade") {
        // Crusade! (join the crusade and roll a number of soldiers.
        //  If your end total of committed soldiers is high enough, increase your dynasty rank)
        showEventDialog("./media/crusadeBegins.png",
            "The Pope has asked for our aid in re-taking the holy land! How many soldiers will we send to aid the forces of the Church? The more you send, the greater the chance to rank up your title (become Emperor)!",
            "Continue");

        document.getElementById("eventInputValue").style.display = "inline-block";
        // reset value from previous amount
        document.getElementById("eventInputValue").value = "";
        document.getElementById("eventInputValue").placeholder = "Enter Soldiers <= Total Amount";
        document.getElementById("inputLabel").style.display = "block";
        document.getElementById("inputLabel").textContent = "Number of soldiers to send: ";
        // trigger how much you ranked up dialog
        // if ranked up, show rank up screen (aand maybe show gameover if rankedup high enough)
        document.getElementById("endEventButton1").onclick = function() {
            let soldiersInput = parseInt(Number((document.getElementById("eventInputValue").value).trim(), 10));
            if (isNaN(soldiersInput)){
                document.getElementById("eventErrorText").style.display = "block";
                document.getElementById("eventErrorText").textContent = "Error: Enter a proper integer."
            } else if ((soldiersInput > playerSoldiers) || (soldiersInput<0)) {
                document.getElementById("eventErrorText").style.display = "block";
                document.getElementById("eventErrorText").textContent = "Error: Number must be between 0 and your total soldiers."
            } else {
                // each soldier sent will roll from 0 to 1,
                // if the rolled amount is high enough you can rank up
                // but as your rank increases the amount needed increases
                let totalRoll = 0;
                for (let s_i = 0; s_i < soldiersInput; s_i++) {
                    // 50% chance (either 0 or 1)
                    if (Math.floor(Math.random() * 2) === 1) {
                        totalRoll++;
                    }
                }

                // soldier losses from sending them out to crusade
                let soldierLosses = Math.floor((Math.random()*(soldiersInput*CRUSADE_MAX_LOSS_PERCENTAGE))+10);
                playerSoldiers -= soldierLosses;
document.getElementById("playerOwnedSoldiers").textContent = "Soldiers :"+playerSoldiers;
                // count, duke, and king have different requirements
                let rankedUp = false;
                if (dynastyRank === 1) {
                    rankedup = totalRoll >= CRUSADE_ROLL_COUNT;
                } else if (dynastyRank === 2) {
                    rankedup = totalRoll >= CRUSADE_ROLL_DUKE;
                } else if (dynastyRank === 3) {
                    rankedup = totalRoll >= CRUSADE_ROLL_KING;
                }
                document.getElementById("playerOwnedSoldiers").textContent = "Soldiers :"+playerSoldiers;
                if (rankedup) {
                    dynastyRank++;
                    // crusade lets you skip a title, so you don't need as many provinces
                    REQUIRED_PROVINCES_DUKE -= 4;
                    REQUIRED_PROVINCES_KING -= 4;
                    REQUIRED_PROVINCES_EMPEROR -= 4;
                    showEventDialog("./media/crusadeVictory.png",
                        "Your soldiers fought valiantly, and impressed the Pope! You lost "+soldierLosses+" soldiers! Your title will rank up to a: " +getDynastyRankString()+"!",
                        "Continue");
                    document.getElementById("endEventButton1").onclick = function() {
                        // check if became holy emperor or ranked up, updating info as needed
                        // todo, should be able to look around map and family tree
                        if(!becameHolyRomanEmperor()) {
                            document.getElementById("eventDialog").style.display = "none";
                            ageIncreasePhase();
                        }
                    };
                } else {
                    // failed crusade
                    showEventDialog("./media/crusadesLoss.jpg",
                        "Your soldiers fought valiantly, but failed to impress the Pope. You lost "+soldierLosses+" soldiers! You do not rank up.",
                        "Continue");
                    document.getElementById("endEventButton1").onclick = function() {
                        document.getElementById("eventDialog").style.display = "none";
                        ageIncreasePhase();
                    };
                }
            }
        };
    } else if (randomChoice === "diseaseKillsMember") {
        // Disease kills family member
        let aliveMembers = [];
        for (let memberId in familyMembers) {
            let famMember = familyMembers[memberId];
            if (famMember.isAlive) {
                aliveMembers.push(famMember);
            }
        }
        let eventText = "";
        let deadMember = aliveMembers[Math.floor(Math.random()*aliveMembers.length)];
        deadMember.isAlive = false;
        if (deadMember === currentRuler) {
            eventText = "You, "+deadMember.name+", were struck down by the invisible hand of disease! Unfortunately the leeches the doctor utilized were not effective.";
        } else {
            eventText = "Family member "+deadMember.name+" has been struck down by the invisible hand of disease! Unfortunately the leeches the doctor utilized were not effective.";
        }
        showEventDialog("./media/diseaseKillsMember.png",
            eventText,
            "Continue");
        document.getElementById("endEventButton1").onclick = function() {
            document.getElementById("eventDialog").style.display = "none";
            showDeathDialog([deadMember], ageIncreasePhase);
        };
    } else if (randomChoice === "diseaseKillsSoldiers") {
        // Disease kills some soldiers
        // choose a random amount of soldiers to lose from disease between min and max possible in increments of 50
        let soldiersDead = Math.max(MIN_SOLDIERS_LOST_DISEASE, (Math.round((Math.random()*MAX_SOLDIERS_LOST_DISEASE)/SOLDIERS_EVENT_MULTIPLE) * SOLDIERS_EVENT_MULTIPLE));
        playerSoldiers -= soldiersDead;
        if (playerSoldiers < 0) {
            playerSoldiers = 0;
        }
document.getElementById("playerOwnedSoldiers").textContent = "Soldiers :"+playerSoldiers;
        showEventDialog("./media/diseaseKillsSomeSoldiers.png",
            "A plague has spread amongst your troops! "+soldiersDead+" soldiers unlucky enough to die of the illness will no longer be able to serve you on the battlefield!",
            "Continue");

        document.getElementById("endEventButton1").onclick = function() {
            document.getElementById("eventDialog").style.display = "none";
            document.getElementById("playerOwnedSoldiers").textContent = "Soldiers :"+playerSoldiers;
            // move directly to increase age and true end turn
            ageIncreasePhase();
        };
    } else if (randomChoice === "assassinationByMember") {
        // Assassination by family member
        let aliveMembers = [];
        for (let memberId in familyMembers) {
            let famMember = familyMembers[memberId];
            if (famMember.isAlive) {
                aliveMembers.push(famMember);
            }
        }
        // if theres 1 other non ruler person have them murder someone (But not themselves).
        //  - otherwise just write generic "distant relative".
        let eventText = "";
        let assassin;
        let deadMember;
        let potentialMurderers = [];
        let potentialVictims = []
        // chosen random non ruler who's >=16
        for (let person of aliveMembers) {
            if (person !== currentRuler && (person.age >= MIN_ASSASSIN_AGE)) {
                potentialMurderers.push(person);
            }
        }
        if (potentialMurderers.length > 0) {
            assassin = potentialMurderers[Math.floor(Math.random()*potentialMurderers.length)];
            // choose random member who is not the assassin to die
            for (let person of aliveMembers) {
                if (person !== assassin) {
                    potentialVictims.push(person);
                }
            }
            deadMember = potentialVictims[Math.floor(Math.random()*potentialVictims.length)];
            if (deadMember === currentRuler) {
                eventText = "You, "+deadMember.name+" have lost your life to the scheming of family member "+assassin.name+"! An assassin slipped into your chambers while you slept, paid for by family member "+assassin.name+"!";
            } else {
                eventText = "Your cherished relative, "+deadMember.name+" has lost their life to the scheming of family member "+assassin.name+"! An assassin slipped into their chambers while they slept, paid for by family member "+assassin.name+"!";
            }
        } else {
            // you only have your ruler, so generic assassin
            deadMember = currentRuler;
            eventText = "You, "+currentRuler.name+", lost your life to the scheming of a distant relative! An assassin slipped into your chambers while you slept, paid for by those traitors!";
        }
        deadMember.isAlive = false;
        showEventDialog("./media/assassinationByMember.png",
            eventText,
            "Continue");

        document.getElementById("endEventButton1").onclick = function() {
            document.getElementById("eventDialog").style.display = "none";
            // how death dialog and continue to next turn
            showDeathDialog([deadMember], ageIncreasePhase);
        };
    } else if (randomChoice === "assassinationByDynasty") {
        // Assassination by other Dynasty
        let aliveMembers = [];
        for (let memberId in familyMembers) {
            let famMember = familyMembers[memberId];
            if (famMember.isAlive) {
                aliveMembers.push(famMember);
            }
        }
        let eventText = "";
        let deadMember = aliveMembers[Math.floor(Math.random()*aliveMembers.length)];
        deadMember.isAlive = false;
        // chosen 2 random dynasties
        // TODO WHAT IF THE DYNASTY DOESNT EXIST ANYMORE??? makes no sense...
        // TODO IMPLEMENT DYNASTY HAS DIED/FALLEN EVENT! (and label them as "Dead" or gone etc in data)
        //   label as dead so we don't use their name in events!
        if (deadMember === currentRuler) {
            eventText = "You, "+deadMember.name+", have lost your life to the scheming of the "+countries[Math.floor(Math.random()*countries.length)].name+"! An assassin slipped into your chambers while you slept, paid for by the "+countries[Math.floor(Math.random()*countries.length)].name+".";
        } else {
            eventText = "Your relative, "+deadMember.name+", has lost their life to the scheming of the "+countries[Math.floor(Math.random()*countries.length)].name+"! An assassin slipped into their chambers while they slept, paid for by the "+countries[Math.floor(Math.random()*countries.length)].name+".";
        }
        showEventDialog("./media/assassinationByOtherDynasty.png",
            eventText,
            "Continue");
        document.getElementById("endEventButton1").onclick = function() {
            document.getElementById("eventDialog").style.display = "none";
            showDeathDialog([deadMember], ageIncreasePhase);
        };
    } else if (randomChoice === "failedAssassination") {
        // Failed assassination attempt 
        showEventDialog("./media/failedAssassination.png",
            "An assassination plot against you was foiled by your guards! Unfortunately the assassin escaped before you could determine who hired them.",
            "Continue");

        document.getElementById("endEventButton1").onclick = function() {
            document.getElementById("eventDialog").style.display = "none";
            // move directly to increase age and true end turn
            ageIncreasePhase();
        };
    } else if (randomChoice === "deathSoldiersHygiene") {
        // Death of soldiers due to poor hygiene
        // choose a random amount of soldiers to lose from disease between min and max possible in increments of 50
        let soldiersDead = Math.max(MIN_SOLDIERS_LOST_DISEASE, (Math.round((Math.random()*MAX_SOLDIERS_LOST_DISEASE)/SOLDIERS_EVENT_MULTIPLE) * SOLDIERS_EVENT_MULTIPLE));
        playerSoldiers -= soldiersDead;
        if (playerSoldiers < 0) {
            playerSoldiers = 0;
        }
document.getElementById("playerOwnedSoldiers").textContent = "Soldiers :"+playerSoldiers;
        showEventDialog("./media/deathOfSoldiersHygiene.png",
            soldiersDead+" units of your soldiers are unfit for combat due to extremely poor hygiene! Disease and filth spread unchecked throughout your barracks!",
            "Continue");

        document.getElementById("endEventButton1").onclick = function() {
            document.getElementById("eventDialog").style.display = "none";
            document.getElementById("playerOwnedSoldiers").textContent = "Soldiers :"+playerSoldiers;
            // move directly to increase age and true end turn
            ageIncreasePhase();
        };
    } else {
        console.log("ERROR: NO EVENT FOR RANDOM INDEX: " + randomChoice);
    }
}

// get random choice given weights and return an index
// (choice is the index of weight given, so maintain same index of weight as event)
function weightedRandomChoice(weights) {
  // finding cumulative weights
  // e.g.: weights = [0.1, 0.4, .95]
  // cumulativeWeights = [0.1, 0.5, 1.00]
  const event_keys = Object.keys(weights);
  const cumulativeWeights = [];
  for (let i = 0; i < event_keys.length; i++) {
    // || 0 for i = 0 case, since there's element before the first
    cumulativeWeights[i] = weights[event_keys[i]] + (cumulativeWeights[i - 1] || 0);
  }

  // choose random number from 0 to sum of all weights (max cumulative weight)
  const randomNum = (cumulativeWeights[cumulativeWeights.length - 1]) * Math.random();

  // select first item whose cumulative weight is greater than randomnNum
  for (let i = 0; i < cumulativeWeights.length; i++) {
    if (cumulativeWeights[i] >= randomNum) {
      return event_keys[i];
    }
  }
}

// ensures that ui is updated properly on every ruler change
function updateRuler(newRuler=currentRuler) {
    currentRuler = newRuler;
    // todo make name depend on gender!?
    document.getElementById("rulerNameUI").textContent = getDynastyRankString() +" "+ newRuler.name +" of "+ playerCountry.name;
    document.getElementById("rulerIcon").src = currentRuler.iconUrl;
    document.getElementById("age").textContent = "Age: " + newRuler.age;
    document.getElementById("skillLevel").textContent = "Skill: " + newRuler.skillLevel;
}

function showDeathDialog(deadMembers, nextStepCallback, causeOfDeath="") {
    let gameOver = false;
    // extra nonruler nonHeir members that died
    let extraDeadMembers = [];
    let kingDied = false;
    let heirDied = false;
    for (let deadMember of deadMembers) {
        if (deadMember === currentRuler) {
                kingDied = true;
        } else if (deadMember === currentHeir) {
            heirDied = true;
        } else {
            extraDeadMembers.push(deadMember);
        }
    }
    // update ruler age ui
    updateRuler();
    // extra nonking or heir memeber
    let deathEventText = "";
    let extraAliveMembers = [];
    for (let memberId in familyMembers) {
        let famMember = familyMembers[memberId];
        if (famMember.isAlive && (famMember != currentRuler) && (famMember!=currentHeir)) {
            extraAliveMembers.push(famMember);
        }
    }
    if (kingDied && heirDied) {
        // trigger both ruler and heir selection
        // end game if no heir possible for ruler replacement
        // if there's > 1. let them choose both ruler and heir
        if (extraAliveMembers.length > 1) {
            deathEventText += "Heavens! Both you, " +currentRuler.name+ ", AND your heir, " +currentHeir.name+", have died "+causeOfDeath+" simultaneously, so you must choose the new ruler to become and heir!";
            // open ruler selection. and then do heir selection
            currentRuler = null;
            currentHeir = null;
            document.getElementById("endEventButton1").onclick = function(){
                document.getElementById("eventDialog").style.display = "none";
                showFamilyTree(CHANGE_RULER_CONDITION, "Change Ruler");
                document.getElementById("treeCancel").style.display = "none";  // can't cancel
                document.getElementById("treeConfirm").onclick = function() {
                    // if nothing was selected, give error message, otherwise continue
                    if (validMemberSelected(true)) {
                        // update current ruler
                        updateRuler(selectedMemberWrapper.member);
                        resetFamilyTree();
                        // select new heir next
                        selectNewHeir(nextStepCallback);
                    }
                };
            };
        } else if (extraAliveMembers.length === 1) {
            // there's 1 member remaining. choose it to be ruler automatically. no heir
            deathEventText += "Heavens! Both you, " +currentRuler.name+ ", AND your heir, " +currentHeir.name+", have died "+causeOfDeath+" simultaneously. There is only 1 remaining family member, "+extraAliveMembers[0].name+", so you will become them! If you die before you get a new heir, you lose!";
            updateRuler(extraAliveMembers[0]);
            currentHeir = null;
            document.getElementById("endEventButton1").onclick = function(){
                document.getElementById("eventDialog").style.display = "none";
                nextStepCallback();
            };
        } else {
            // no one to replace ruler and heir. so game over
            gameOver = true;
            deathEventText += "Heavens! Both you, " +currentRuler.name+ ", AND your heir, " +currentHeir.name+", have died "+causeOfDeath+" simultaneously. There is no one else alive to take their place...Your dynasty has failed. GAME OVER!";
        }
    } else if (kingDied || heirDied) {
        if (kingDied) {
            // end game if no heir possible for ruler replacement
            if (currentHeir === null) {
                gameOver = true;
                deathEventText += "Heavens! You, " +currentRuler.name+", have died "+causeOfDeath+"! You died with no heir so your dynasty has failed. GAME OVER!.";
            } else if (extraAliveMembers.length === 1) {
                // if only 1 possible heir so we automatically select
                deathEventText += "Heavens! You, " +currentRuler.name+", have died "+causeOfDeath+"! So your heir, " +currentHeir.name+", will take the throne. There is only 1 remaining family member, "+extraAliveMembers[0].name+", so they will be your new heir!";
                updateRuler(currentHeir);
                currentHeir = extraAliveMembers[0];
                document.getElementById("endEventButton1").onclick = function(){
                    document.getElementById("eventDialog").style.display = "none";
                    nextStepCallback();
                };
            } else if (extraAliveMembers.length === 0) {
                // no heirs to choose
                deathEventText += "Heavens! You, " +currentRuler.name+", have died "+causeOfDeath+"! So your heir, " +currentHeir.name+", will take the throne. There is no one else to be your heir right now, so if you die before you get a new heir you will lose!";
                updateRuler(currentHeir);
                currentHeir = null;
                document.getElementById("endEventButton1").onclick = function(){
                    document.getElementById("eventDialog").style.display = "none";
                    // check if this is just king/heir death check from event death
                    nextStepCallback();
                };
            } else {
                // there's multiple options, so let them choose an heir
                deathEventText += "Heavens! You, " +currentRuler.name+", have died "+causeOfDeath+"! So your heir, " +currentHeir.name+", will take the throne. You must select a new heir.";
                updateRuler(currentHeir);
                currentHeir = null;
                document.getElementById("endEventButton1").onclick = function(){
                    document.getElementById("eventDialog").style.display = "none";
                    // choose new heir
                    selectNewHeir(nextStepCallback);
                };
            }
        } else if (heirDied) {
            // if just heir died
            if (extraAliveMembers.length === 1) {
                // if only 1 possible heir so we automatically select
                deathEventText += "Heavens! Your heir, " +currentHeir.name+", has died"+causeOfDeath+"! There is only 1 remaining family member, "+extraAliveMembers[0].name+", so they will be your new heir!";
                currentHeir = extraAliveMembers[0];
                document.getElementById("endEventButton1").onclick = function(){
                    document.getElementById("eventDialog").style.display = "none";
                    nextStepCallback();
                };
            } else if (extraAliveMembers.length === 0) {
                // no heirs to choose
                deathEventText += "Heavens! Your heir, " +currentHeir.name+", has died"+causeOfDeath+"! There is no one else to be your heir right now, so if you die before you get a new heir you will lose!";
                currentHeir = null;
                document.getElementById("endEventButton1").onclick = function(){
                    document.getElementById("eventDialog").style.display = "none";
                    nextStepCallback();
                };
            } else {
                // multiple options, so let them choose an heir
                deathEventText += "Heavens! Your heir, " +currentHeir.name+", has died"+causeOfDeath+"! You must select a new heir.";
                currentHeir = null;
                document.getElementById("endEventButton1").onclick = function(){
                    document.getElementById("eventDialog").style.display = "none";
                    selectNewHeir(nextStepCallback);
                };
            }
        }
    }
    if (extraDeadMembers.length > 0) {
        // non king or heir died
        deathEventText += "Heavens! The following relatives have also died "+causeOfDeath+": ";
            for (let deadMember of extraDeadMembers) {
                deathEventText += deadMember.name + ". \n";
        }
        // only random people died
        if ((!kingDied) && (!heirDied)) {
            document.getElementById("endEventButton1").onclick = function(){
                document.getElementById("eventDialog").style.display = "none";
                nextStepCallback();
            };
        }
    }
    if (gameOver) {
        showEventDialog("./media/gameOver.jpg", deathEventText);
        // disaable continue button, game over
        document.getElementById("endEventButton1").style.display = "none";
    } else {
        showEventDialog("./media/deathOfOldAge.png",
            deathEventText,
            "Continue");
    }
}

// show event dialog. resets errors, buttons, etc. which must be manually enabled and text filled
// TODO. by default always enable the first (continue) button.
// TODO for game over screen manually hide after calling this
function showEventDialog(imgUrl, eventText, button1Text="Continue", button2Text=null) {
    // disable turn actions while processing popup
    toggleTurnActions(false);
    document.getElementById("eventImage").src = imgUrl;
    document.getElementById("eventText").textContent = eventText;
    // hardcoded to have a few options.
    // if text for option not given, hide. otherwise display.
    document.getElementById("endEventButton1").style.display = "block";
    document.getElementById("endEventButton1").textContent = button1Text;
    if ((button2Text === undefined)  || (button2Text === null)) {
        document.getElementById("endEventButton2").style.display = "none";
    } else {
        document.getElementById("endEventButton2").style.display = "block";
        document.getElementById("endEventButton2").textContent = button2Text;
    }
    document.getElementById("inputLabel").style.display = "none";
    document.getElementById("eventInputValue").style.display = "none";
    document.getElementById("eventErrorText").style.display = "none";

    // actually show dialog
    document.getElementById("eventDialog").style.display = "block";
}

// display family tree and take "condition"/context that the tree was called on which
// determines what selections are valid and the relevant error message in that context (like educateChild vs arrangeMarriage)
function showFamilyTree(condition, titleText) {
    // disable turn actions while processing popup
    toggleTurnActions(false);
    document.getElementById("familyTree").style.display = "block";
    document.getElementById("familyErrorText").style.display = "none";
    document.getElementById("familyTreeTitle").textContent = titleText;
    document.getElementById("treeCancel").style.display = "block";
    document.getElementById("treeConfirm").style.display = "block";
    var familyList = document.getElementById("rootFamilyRow");
    let searchStack = [];  // stack of child nodes to visit
    let currNode;  // holds member = currMember, and depth = current depth (keeping track for ui purposes)
    let visitedMembers = new Set();  // set of visited members by id
    // starting from the very 1st/oldest family member, keep searching all children
    // tracking depth for ui; increment for every child
    searchStack.push({
        member : familyMembers[0],
        depth : 0
    });
    while (searchStack.length > 0) {
        currNode = searchStack.pop();
        let currMember = currNode.member;
        if (!visitedMembers.has(currMember.uniqueId)) {
            // wrapping in div
            // let newItemDiv = document.createElement('div');
            let newItem = document.createElement('li');
            // newItem.style.position = "absolute";
            // newItem.style.display = "inline-block";
            newItem.style.width = "fit-content";
            // newItem.style.left = "50%";
            // newItem.style.top = "10%";
            if (currMember === currentRuler) {
                newItem.style.backgroundImage = "url('media/king_crown.png')";
                newItem.style.backgroundSize = "100% 100%";
            } else if (currMember === currentHeir) {
                newItem.style.backgroundImage = "url('media/heir_crown.png')";
                newItem.style.backgroundSize = "100% 100%";
            }
            // let newItem = document.createElement('li');
            // if dead add skull symbol
            let deadSymbol = "";
            if (!currMember.isAlive) {
                deadSymbol += "💀 ";
            }
            let nameText = document.createElement("p");
            nameText.appendChild(document.createTextNode(deadSymbol + currMember.name + " ("+currMember.age+"yrs)"));
            nameText.style.margin = "0px 0px 0px 30%";
            nameText.style.width = "100%";
            newItem.appendChild(nameText);
            // newItem.appendChild(document.createTextNode(deadSymbol + currMember.name + " ("+currMember.age+"yrs)"));
            newItem.style.fontSize = "30px";
            newItem.style.marginLeft = (currNode.depth * 12) + "%";
            // if married, show nation flag married to.
            if (!(currMember.spouse===null)) {
                let marriageFlag = document.createElement('img');
                marriageFlag.src = currMember.spouse.flagUrl;
                marriageFlag.style.height = "30px";
                marriageFlag.style.width = "30px";
                marriageFlag.style.float = "right";
                newItem.appendChild(marriageFlag);
            }
            // charactericon
            let iconImgTag = document.createElement('img');
            iconImgTag.src = currMember.iconUrl;
            iconImgTag.style.height = "80px";
            iconImgTag.style.width = "80px";
            iconImgTag.style.marginLeft = "30%";
            newItem.appendChild(iconImgTag);
            newItem.appendChild(document.createElement("br"));
            let skillText = document.createElement("p");
            skillText.appendChild(document.createTextNode("Skill: " + currMember.skillLevel));
            skillText.style.margin = "0px 0px 0px 30%";
            newItem.appendChild(skillText);
            // newItem.appendChild(document.createTextNode("Skill: " + currMember.skillLevel));
            // when member is clicked, check if it's possible to become heir (giving error messages if not)
            // and then save this selected member for on confirm.
            newItem.onclick = function() {
                switch (condition) {
                    case EDUCATE_CHILD_CONDITION:
                        if (!currMember.isAlive) {
                            showFamilyErrorText("Cannot select dead relative!");
                        } else if (currMember === currentRuler){
                            showFamilyErrorText("You cannot educate your current ruler!");
                        } else if (currMember.age > MAX_EDUCATE_AGE) {
                            showFamilyErrorText("Child age cannot be over "+MAX_EDUCATE_AGE+" years!");
                        } else if (currMember.skillLevel >= MAX_SKILL_LEVEL) {
                            showFamilyErrorText("Child skill is already at Max Level "+MAX_SKILL_LEVEL+"!");
                        } else {
                            swapFamilyTreeSelectedMember(this, currMember);
                        }
                        break;
                    case ARRANGE_MARRIAGE_CONDITION:
                        if (!currMember.isAlive) {
                            showFamilyErrorText("Cannot select dead relative!");
                        } else if (currMember.spouse !== null) {
                            showFamilyErrorText("They are already married to a noble from the "+currMember.spouse.name+"!");
                        } else {
                            swapFamilyTreeSelectedMember(this, currMember);
                        }
                        break;
                    case CHANGE_RULER_CONDITION:
                        if (!currMember.isAlive) {
                            showFamilyErrorText("Cannot select dead relative!");
                        } else {
                            swapFamilyTreeSelectedMember(this, currMember);
                        }
                        break;
                    case CHANGE_HEIR_CONDITION:
                        if (!currMember.isAlive) {
                            showFamilyErrorText("Cannot select dead relative!");
                        } else if (currMember === currentRuler) {
                            showFamilyErrorText("Cannot select Ruler as heir!");
                        } else if (currMember === currentHeir) {
                            showFamilyErrorText("This is already your heir!");
                        }  else {
                            swapFamilyTreeSelectedMember(this, currMember);
                        }
                        break;
                    case RENOWED_TEACHER_CONDITION:
                        if (!currMember.isAlive) {
                            showFamilyErrorText("Cannot select dead relative!");
                        } else if (currMember === currentRuler){
                            showFamilyErrorText("You cannot educate your current ruler!");
                        } else if (currMember.age > MAX_EDUCATE_AGE) {
                            showFamilyErrorText("Child age cannot be over "+MAX_EDUCATE_AGE+" years!");
                        } else {
                            swapFamilyTreeSelectedMember(this, currMember);
                        }
                        break;
                    case VIEW_FAMILY_TREE_CONDITION:
                        break;
                    default:
                        console.log("FamilyTree condition "+condition+" doesn't exist!");
                }
            };
            familyList.appendChild(newItem);
            visitedMembers.add(currMember.uniqueId);

            // any remaining children will be visited after if not already
            for (let child of currMember.children) {
                if (!visitedMembers.has(child.uniqueId)) {
                    searchStack.push({
                        member : child,
                        depth : (currNode.depth+1)
                    });
                }
            }
        }
    }
}

function swapFamilyTreeSelectedMember(element, currMember) {
    // put error text away since they made a valid selection
    document.getElementById("familyErrorText").style.display = "none";
    // if nothing has been selected yet, set this to selection
    if (selectedMemberWrapper.element === null) {
        element.style.backgroundColor = "green";
        selectedMemberWrapper.element = element;
        selectedMemberWrapper.member = currMember;
    } else if (!(selectedMemberWrapper.element === element)) {
        // if something else was selected, undo that style
        selectedMemberWrapper.element.style.backgroundColor = "";
        element.style.backgroundColor = "green";
        selectedMemberWrapper.element = element;
        selectedMemberWrapper.member = currMember;
    }
}

// check if a valid member was selected, with error msg if they must select or not
// return true if valid
function validMemberSelected(mustSelect) {
    if (selectedMemberWrapper.element === null) {
        if (mustSelect) {
            showFamilyErrorText("You must select someone.");
        } else {
            showFamilyErrorText("No one was selected. If there's no options, click cancel.");
        }
        return false;
    } else {
        return true;
    }
}

function showFamilyErrorText(text) {
    document.getElementById("familyErrorText").style.display = "block";
    document.getElementById("familyErrorText").textContent = text;
}

// clear family tree of all elements. call this everytime you're done with family tree
function resetFamilyTree() {
    // reset selected member
    selectedMemberWrapper.element = null;
    selectedMemberWrapper.member = null;

    document.getElementById("familyTree").style.display = "none";
    // delete nodes so we can redraw later (remove in reverse so we don't miss anything)
    let allListElements = document.getElementById("rootFamilyRow").children;
    for (let child_i = allListElements.length-1; child_i >= 0; child_i--) {
        allListElements[child_i].remove();
    }
}

// reset actions and actually end turn
function resetActionsEndTurn() {
    actionsTaken = 0;
    document.getElementById("actionCount").textContent = "Actions: " + actionsTaken + "/" + currentRuler.skillLevel;
    toggleTurnActions(true);
    document.getElementById("endTurn").disabled = true;
}

function selectNewHeir(nextStepCallback) {
    showFamilyTree(CHANGE_HEIR_CONDITION, "Select New Heir");
    document.getElementById("treeCancel").style.display = "none";  // can't cancel
    document.getElementById("treeConfirm").onclick = function() {
        if (validMemberSelected(true)) {
            // update current heirf
            currentHeir = selectedMemberWrapper.member;
            resetFamilyTree();
            // go to next step/phase given
            nextStepCallback();
        }
    };
}

// use for every birth event until no more births left
function birthEventProcessing(allBirths, index) {
    // if this has already happened, change text a little..
    let eventText = "";
    if (index > 0) {
        eventText = "Congratulations! Another "+((allBirths[index][1].gender===M_GENDER) ? "boy":"girl")+" was born to the family of "+allBirths[index][0].name+"!";
    } else {
        eventText = "Rejoice! A "+((allBirths[index][1].gender===M_GENDER) ? "boy":"girl")+" was born to the family of "+allBirths[index][0].name+"!";
    }
    showEventDialog("./media/birthEvent.png",
        eventText,
        "Continue");

    document.getElementById("eventInputValue").style.display = "inline-block";
    // reset value from previous amount
    document.getElementById("eventInputValue").value = "";
    document.getElementById("eventInputValue").placeholder = "New Name";
    document.getElementById("inputLabel").style.display = "block";
    // TODO supposed to be first name, and then we add Dynasty Name
    document.getElementById("inputLabel").textContent = "Enter the new child's name: ";

    document.getElementById("endEventButton1").onclick = function() {
        // update child's name to inputted name
        let nameInput = document.getElementById("eventInputValue").value.trim();
        allBirths[index][1].name = nameInput;
        index++;
        // if there's more births to process, repeat event
        // else move to end turn
        if (index < allBirths.length) {
            birthEventProcessing(allBirths, index);
        } else {
            // move directly to increase age and true end turn
            document.getElementById("eventDialog").style.display = "none";
            resetActionsEndTurn();
        }
    };
}

// calculate possible births, then go to next turn
// Birth of a family member
// (Each turn married relative 16 years old or above has a 50% chance to generate a child (player can name it)
function birthPhase() {
        // 2d array of all pairings. [parent, child], [parent, child] etc.
        let allBirths = [];
        for (let memberId in familyMembers) {
            let famMember = familyMembers[memberId];
            // if the fam member if alive, married, and over 16, there's an X % chance of making a chlid
            if (famMember.isAlive && (famMember.spouse!==null) && (famMember.age>=MIN_AGE_BIRTH)) {
                if (Math.random() < BIRTH_CHANCE) {
                    // child has random skill level from 1 to 3;
                    // and 50% chance to be boy or girl
                    let gender;
                    if (Math.floor(Math.random() * 2) === 1) {
                        gender = M_GENDER;
                    } else {
                        gender = F_GENDER;
                    }
                    let newChild = new Character("", 0, Math.floor(Math.random()*3)+1, babyIcons[gender], gender);
                    famMember.children.push(newChild);
                    allBirths.push([famMember, newChild]);
                    // if there is no heir currently, make this child new heir
                    if (currentHeir === null) {
                        currentHeir = newChild;
                    }
                }
            }
        }
        // for each birth, show event screen and when finished repeat if there's another birth
        // each pair is array of [parent, child]
        if (allBirths.length > 0) {
            birthEventProcessing(allBirths, 0);
        } else {
            // no births, move to end turn
            resetActionsEndTurn();
        }
}

// increment age of all members, check if dead from old age
// after events are done, move to next turn
function ageIncreasePhase() {
    currentYear += 10;
    document.getElementById("currentYear").textContent = "Year: " + currentYear;

    // everyone who died of old age put here
    let deadMembers = [];
    for (let memberId in familyMembers) {
        let famMember = familyMembers[memberId];
        if (famMember.isAlive) {
            famMember.age += 10;
            if (famMember.age < 10) {
                famMember.iconUrl = babyIcons[famMember.gender];
            } else if(famMember.age >= 10 && famMember.age < 30) {
                famMember.iconUrl = kidIcons[famMember.gender];
            } else {
                // if adult over 30, choose random icon
                // IF icon isn already set
                if (!famMember.iconSet) {
                    if (famMember.gender === M_GENDER) {
                        famMember.iconUrl = "./media/king_"+(Math.floor(Math.random()*3)+1)+".png"
                    } else {
                        famMember.iconUrl = "./media/queen_"+(Math.floor(Math.random()*3)+1)+".png"
                    }
                    famMember.iconSet = true;
                }
            }

            // increasing chance of death after min aging year
            // from 1% to 100% as you approach max age of 101
            if ((famMember.age >= MIN_AGING_YEAR) && ((famMember.age/MAX_AGE) > Math.random())) {
                famMember.isAlive = false;
                deadMembers.push(famMember);
            }
        }
    }
    // update ruler incase icon changed
    updateRuler();
    // if someone died, load show deathDialog
    if (deadMembers.length > 0) {
        showDeathDialog(deadMembers, birthPhase, "from old age");
    } else {
        // continue with rest of end turn phase
        birthPhase();
    }
}

// increase actionstaken, update in ui, and reset all buttons to normal
// this should only be called once done with an action completely
function incrementActionsTaken() {
    actionsTaken++;
    document.getElementById("actionCount").textContent = "Actions: " + actionsTaken + "/" + currentRuler.skillLevel;
    resetAllActions();
}

// reset all action buttons depending if all actions were used or not
function resetAllActions() {
    if (actionsTaken === currentRuler.skillLevel) {
        toggleTurnActions(false);
        document.getElementById("endTurn").disabled = false;
        document.getElementById("viewFamilyTree").disabled = false;
    } else {
        toggleTurnActions(true);
    }
}

// turn turn action buttons on or off
function toggleTurnActions(isEnabled) {
    let turnActions = document.getElementById("turnActions").getElementsByTagName("button");
    for (let action of turnActions) {
        action.disabled = !isEnabled;
    }
}

// check if there's any children eligible to educate by renowed teacher (ignores skill level)
// (otherwise we won't trigger renowed teacher event)
function hasChildrenToEducate() {
    for (let memberId in familyMembers) {
        let member = familyMembers[memberId];
        if (member.isAlive && (member !== currentRuler) && (member.age <= MAX_EDUCATE_AGE)) {
            return true;
        }
    }
    // no child found
    return false;
}

// check if became holyRoman Emperor, then end game. otherwise return false
function becameHolyRomanEmperor() {
    const province_count = Object.keys(provincesOwned).length;
    document.getElementById("provinceNumber").textContent = "Provinces: "+province_count;
    document.getElementById("dynastyRank").textContent = "Rank: " + getDynastyRankString();
    updateRuler();
    if (dynastyRank === 4) {
        // if they became holy roman emperor
        showEventDialog("./media/becameEmperor.jpg",
            "The realm rejoices! Despite all challenges, your dynasty House "+playerCountry.dynastyName+" thrived! YOU WIN");
        // disable button, game over
        document.getElementById("endEventButton1").style.display = "none";
        return true;
    }
    return false;
}

function getDynastyRankString() {
    if (dynastyRank === 1) {
        return "Count";
    } else if (dynastyRank === 2) {
        return "Duke";
    } else if (dynastyRank === 3) {
        return "King/Queen";
    } else if (dynastyRank === 4) {
        return "Holy Roman Emperor";
    }
}

// get how many provinces are needed to rank up
function getRequiredProvinces() {
    if (dynastyRank === 1) {
        return REQUIRED_PROVINCES_DUKE;
    } else if (dynastyRank === 2) {
        return REQUIRED_PROVINCES_KING;
    } else if (dynastyRank === 3) {
        return REQUIRED_PROVINCES_EMPEROR;
    }
}

// get opinion of nation taking soldier difference into account
// TOO KEEP IN RANGE OF 100!
function getTrueOpinion(region) {
    // if we have more soldiers than province, return the country's opinion + difference * multiplier
    if (region.soldiers < playerSoldiers) {
        return Math.min(Math.round(region.countryOwner.opinion + ((playerSoldiers-region.soldiers)*GREATER_STRENGTH_OPINION_MULTIPLIER)), 100);
    } else {
        // if equal or weaker than province
        return region.countryOwner.opinion;
    }
}

// update the view of the currently shown province to reflect recent changes
function updateCurrentlyShownProvince() {
    if (chosenRegion.countryOwner === playerCountry) {
        document.getElementById("regionSoldiers").style.display = "none";
        document.getElementById("regionCountryOpinion").style.display = "none";
    } else {
        document.getElementById("regionSoldiers").style.display = "block";
        document.getElementById("regionCountryOpinion").style.display = "block";
        document.getElementById("regionSoldiers").textContent = "Soldiers: " + chosenRegion.soldiers;
        // todo show opinion with soldiers taken into account
        document.getElementById("regionCountryOpinion").textContent = "Opinion: " + getTrueOpinion(chosenRegion);
    }
    document.getElementById("regionOwnerFlag").src = chosenRegion.countryOwner.flagUrl;
    document.getElementById("regionOwnerName").textContent = chosenRegion.countryOwner.name;
    document.getElementById("regionDynastyName").textContent = "House " + chosenRegion.countryOwner.dynastyName;
    document.getElementById("regionName").textContent = chosenRegion.name;
}

// todo change view !
// add (or subtract) opinion and update province view.
function changeOpinion(opinion, targetCountry) {
    let newOpinion = targetCountry.opinion + opinion;
    // opinion must be between 0 or 100
    if (newOpinion > 100) {
        targetCountry.opinion = 100;
    } else if (newOpinion < 0) {
        targetCountry.opinion = 0;
    } else {
        targetCountry.opinion = newOpinion;
    }
    // if region is owned by country opinion being changed
    if (chosenRegion.countryOwner === targetCountry) {
        updateCurrentlyShownProvince();
    }
}

// change control of a region from one country to another
// change its color as needed
function changeRegionControl(region, targetCountry) {
    // if player is gaining control
    if (targetCountry === playerCountry) {
        provincesOwned[region.name] = region;
    } else if (regions[region.name].countryOwner === playerCountry) {
        // if another country is gaining control, remove it from provinces owned
        delete provincesOwned[region.name];
    }
    regions[region.name].countryOwner = targetCountry;
    // change color to new countries color
    document.getElementById(region.name).style.fill = targetCountry.color;
    const province_count = Object.keys(provincesOwned).length;
    // show how many left are needed for next level (every time it's three more)
    document.getElementById("provinceNumber").textContent = "Provinces: "+province_count;
    // if region is currently being shown, update
    if (chosenRegion.name === region.name) {
        updateCurrentlyShownProvince();
    }
}

function showSoldierInputValue() {
        document.getElementById("eventInputValue").style.display = "inline-block";
    // reset value from previous amount
    document.getElementById("eventInputValue").value = "";
    document.getElementById("eventInputValue").placeholder = "Enter Soldiers <= Total Amount";
    document.getElementById("inputLabel").style.display = "block";
    document.getElementById("inputLabel").textContent = "Number of soldiers to send: ";
}

// checks if inputted valid soldier count and return true, else display error message.
function validSoldierInput(){
    let soldiersInput = parseInt(Number((document.getElementById("eventInputValue").value).trim(), 10));
    if (isNaN(soldiersInput)){
        // displayErrorMessage("Error: Every box must be filled with a number (type 0 if none)!");
        document.getElementById("eventErrorText").style.display = "block";
        document.getElementById("eventErrorText").textContent = "Error: Enter a proper integer."
        return false;
    } else if ((soldiersInput > playerSoldiers) || (soldiersInput<0)) {
        document.getElementById("eventErrorText").style.display = "block";
        document.getElementById("eventErrorText").textContent = "Error: Number must be between 0 and your total soldiers."
        return false;
    } else {
        return true;
    }
}

// calculate results of battle given amount of units on both sides, and return as object:
// friendly losses, enemy losses, remaining sent, remaining enemy soldiers
function calculateBattleResults(enemyN){
    // soldiers input is already validated here
    let soldiersInput = parseInt(Number((document.getElementById("eventInputValue").value).trim(), 10));
    // valid integer and proper bounds of soldiers
    //   Risk-style combat
    // Each soldier sent (And defending soldier in province) rolls 0-1
    // Soldiers thaat roll 1 kill an enemy
    // After roll, the faction with more soldiers involved wins the war
    // not total soldiers, but solders involved in battle
    // so the more you send, the more you risk to lose!

    // for every friendly soldier, roll.
    //    determine amount of soldiers province lost
    //    min of amount rolled and total amount here
    let enemyLosses = 0;
    for (let fren_i = 0; fren_i < soldiersInput; fren_i++) {
        // 50% chance (either 0 or 1)
        if (Math.floor(Math.random() * 2) === 1) {
            enemyLosses++;
        }
    }
    // can't kill more people than what exists
    enemyLosses = Math.min(enemyLosses, enemyN);
    // for every enemy soldier, roll.
    //    determine amount of soldiers you lost
    //    min of amount rolled and total amount you sent
    let friendlyLosses = 0;
    for (let enem_i = 0; enem_i < enemyN; enem_i++) {
        if (Math.floor(Math.random() * 2) === 1) {
            friendlyLosses++;
        }
    }
    friendlyLosses = Math.min(friendlyLosses, soldiersInput);

    return {
        friendlyLosses : friendlyLosses,
        enemyLosses : enemyLosses,
        remainingSoldiersSent : soldiersInput - friendlyLosses,
        remainingEnemySoldiers : enemyN - enemyLosses
    }
}
