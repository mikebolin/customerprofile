import { Component, OnInit, ViewChildren, ViewChild, QueryList, ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AutoCompleteComponent } from '@progress/kendo-angular-dropdowns';
import { PageChangeEvent, GridDataResult, SelectableSettings, DataStateChangeEvent } from '@progress/kendo-angular-grid';
import { process, State, SortDescriptor, orderBy } from '@progress/kendo-data-query';
import { CustomerProfileUI, ContactUI, UpdateSaveCustomerProfile, CustomerProfileRefDataResponseUI } from './CustomerprofileUI';
import { CustomerProfile, Contact } from '../../models/CustomerProfile';
import { AlertMessageComponent } from '../../shared/alert-message/alert-message.component';
import { CustomerService } from '../../services/customer.service';
import { TooltipDirective } from '@progress/kendo-angular-tooltip';
import { EnterpriseChildDTO } from '../../models/collection'

@Component({
  selector: 'app-proactivecollection',
  templateUrl: './customer-profile.component.html',
  styleUrls: ['./customer-profile.component.scss']
})
export class CustomerProfileComponent implements OnInit {
  @ViewChildren('enterpriseautocompleteProactive')
  public enterpriseAutoComplete: QueryList<AutoCompleteComponent>;

  @ViewChild(TooltipDirective)
  public tooltipDir: TooltipDirective;

  @ViewChild(AlertMessageComponent)
  alertMessage: AlertMessageComponent;
  showChild: boolean; 
  showGrid: boolean;
  isListOn: boolean;
  GridData: any[];
  GridDataAll: any[];
  messageImport: string;
  messageLookup: string;
  enterprises: EnterpriseChildDTO[] = null;
  enterpriseData: Array<String>;
  enterpriseDataAll: Array<String>;
  theEnterpriseAutoComplete: AutoCompleteComponent;
  originalText: string;
  selectedEnterprise: EnterpriseChildDTO;
  selectedEnterpriseName: String;
  isImporting: boolean;
  isLookup: boolean;
  lookupError: boolean;
  recordCount: number;
  pageSize: number;
  skip: number;
  isDataloading: boolean;
  public selectableSettings: SelectableSettings;
  selectedId: number;
  selectedDropdownValue: string;
  FilterDropdown: string[];
  searchText: string;
  filterStart: string;
  filterEnd: string;
  range = { start: null, end: null };
  initalData: any[];
  public state: State = {};
  gridView: GridDataResult = null;
  gridCount: string;
  createEnterpriseConfirm: boolean;
  textValue: String;
  buttonEnabled: boolean;
  fakebool: boolean;
  public sort: SortDescriptor[] = [{ field: 'AccountName', dir: 'asc' }];

  constructor( private router: Router, private cdr: ChangeDetectorRef) {
    this.showChild=false;
    this.buttonEnabled = false;
    this.enterpriseData = [];
    this.GridData = new Array<CustomerProfile>();
    this.GridDataAll = new Array<any>();
    this.fakebool = true;
     this.setSelectableSettings();
  }
  ngOnInit() {
    this.initalize();
    this.showGrid = true;

  }

  initalize() {
    this.messageImport = '0';
    this.messageLookup = '3';
    this.skip = 0;
    this.selectedId = 0;
    this.pageSize = 25;
    this.isDataloading = false;
    this.selectedDropdownValue = 'All';
    this.applyTableState(this.state);
    this.FilterDropdown = ['All', 'Pro-Active', 'Non-Proactive'];
    let res = Array<CustomerProfile>();
    let dummy1 = new CustomerProfile();

  dummy1.customerProfileID = 14;

            dummy1.enterpriseID = 62629;
            dummy1.accountName = "Apogee Industries, Inc.";
            dummy1.accountNumber = "60101532";
            dummy1.proactiveAuditNumber = "6123615";
            dummy1.isProactive = true;
            dummy1.proactiveStartDate = new Date();
            dummy1.proactiveEndDate = new Date();
            dummy1.notificationVariance = 20.00;
            dummy1.notificationType = "Apogee Notification Type";
            dummy1.edmName = "ApogeeEDM";
            dummy1.edmEmail = "ApogeeEmail";
            dummy1.esrName = "ApogeeESR";
            dummy1.esrEmail = "ApogeeESREmail";
            dummy1.outboundShipments = true;
            dummy1.notifyByAccountLocation = true;
            dummy1.allSettlementReasons = true;
            dummy1.proactiveNotes = "Apogee Proactive Notes";
            res.push(dummy1);
            this.GridData = res;
            this.GridDataAll = res;


this.enterpriseDataAll = ['BLUESHIPQA','BSQA Chad Shero (718) ***','BLUESHIP DEV','BSDEV Econocaribe','BG Forwarding Demo CARRIER CONTRACTS','Econo Agent Quoting***','Clariant Corporation (Chino)','BSDEV Blackhawks Championship TShirts','BSDEV LDR***','BS DEV Margaritaville','BS DEV On The Rocks','BS DEV Sunset Beach','BS DEV Toes In Sand','BS DEV Salted Rim','BS DEV Icarus','BS DEV FForwarder','ChrisV QA','CV QA Child # 1','BLUESHIP DEV BRAD','BLUESHIP DEV ZVille','BlueGrace Beta','BlueGrace Production','Churchich Restaurant Equipment','Franchise- Orlando (808)','International Distribution & Logistics','Champion Transport (723) ***','Agent- Jacob Grunfeld','DURACARE SEATING COMPANY','EVERYDAY RESTAURANT PRODUCTS',' INC.','IMPORTACIONES',' INC','Franchise-  Omaha (812)','Omaha Demo***','Century Converting','Franchise- Antonio Villarreal (806)','PHILLIPS MIDWEST','SMV Industries','Franchise- Peter Foradas (809)','FLYTEC COMPUTERS','SPEEDY T',' INC','Foradas 4***','DIAMOND TRANSPORTATION ENTERPRISES INC.','Printing Technologies Inc.','Clariant Corporation (McHenry)','LDR Industries Inc***','Midway Importing INC ***','Franchise- (832)','TOMPKINSVILLE AUTO SALVAGE','TOP GRADE FLOORS','TOP TENN LLC','TOPPER INC.','TRAC HEALTH','TRADELINE NATURAL STONE','TRANSWAY FREIGHT SYSTEMS INC','TRC TRANSPORT INTL CORP.','TRI STATE AUTO SALVAGE','TRI STATE PLASTICS INC','BlueGrace','BlueGrace Demo','BGL DEMO DIVISION','MG PROMOTE 2019','MG PROMOTE BLK 2019','MG PROMOTE AS 2019','BlueGrace BS CONTRACT RATING','testing new enterprise API','TWIN CITY TRACTOR AND EQUIPMENT','UC COATINGS CORPORATION','UCS INC','UNICELL BODY CO','UNIQUE WOOD FLOORS','UNIVERSAL AIR PRODUCTS','UPSTATE SHREDDING','US CHUTES','US DIRECT LLC','US PRIDE PRODUCTS LLC','USA MURPHY BEDS','VAN BERGEN & GREENER CO INC.','VANITY PHOTO BOOTHS','VANWOODS FLOORING COMPANY','VENTURE SHUFFLEBOARD','VENUS WAFERS','VETERINARY SERVICE INC','VIBRANT HEALTH','VICTORY GAMES & BILLIARDS','VILLI USA LLC','VITAL SAUNAS INC','VITALITY WORKS','VOELLER MIXERS INC','VOSS DISTRIBUTING','VOURNAS COFFEE TRADING','VOYTEN ELECTRIC','WALDEN SURF SHOP','WALDO BROTHERS','WALKER COFFEE TRADING','WALNUT WOOD WORKS','WALTCO TOOL INC','WCI BUYERS','WEB-USA','WESLEY VALVE CO.','WEST GEORGIA TEXTILE INC.','WESTECH ENGINEERING','WESTERN BOTANICALS','WESTERN DESIGN GALLERY OF TILE & STONE','WESTERN ENTERPRISES SUPPLY INC.','WHITE MOUNTAIN AUTO SALVAGE','WHITEWATER MANUFACTURING','WHOLE WOOD INC','WHOLESALE WOODFLOOR WAREHOUSE','WIGZI','WILL ENTERPRISES','WILLIAM L GRUBER CO LLC','WINE COUNTRY KITCHEN','WM. E. MARTIN & SONS','WOODCO MILLWORKS LIMITED','WORTHINGTON MONUMENTS','WRAP N PACK','WS EMERSON CO.','XBYTE TECHNOLOGIES','Y-YARD AUTO SALVAGE','YOLO BOARD WEST COAST','YOLOBOARD LLC','YOUNG INDUSTRIES INC.','YS METAL','YUNKER PLASTICS','ZENARO LIGHTING','ZEUSCHEL EQUIPMENT CO','ZULU SUP','MORRIS PRODUCTS INC','MSFW INC','MSP DATA SYSTEMS INC.','MULLINS AUTO SALVAGE','MULTI-FLOW','NATHEALTH SOLUTIONS','NATIONAL TELEPHONE SUPPLY COMPANY','NATURAL STATE WHOLESALE','NATURES COMFORT LLC','NEDSA INC','NELCO CORP','NEW AGE CASTING','NEW ENGLAND BOUNCE ABOUT','NEW ENGLAND PARK BENCH','NEW ENGLAND WIRE TECH','NEW HARBORS HARDWOOD','NEW HORIZON CORPORATION','NIFTY HOME PRODUCTS','NIKKO IMPORTS','NN INC','NORTH TOLEDO GRAPHICS','NORTH WOODS CHEESE','NORTHWOODS CASKET COMPANY','NOVATEC BRAID LTD','NRM CO','NUHERBS CO.','NUTRILAND GROUP INC.','OCEANARIUMS','OEM AIR COMPRESSORS','OFF-ROAD PERFORMANCE AND ACCESSORIES','OHIO POLYMERS & RECYCLING','OIL STOP','OLIN ENGINEERING','OMEGA TOOL','OMNI MANUFACTURING LLC','ONE SOURCE FREIGHT','OREGON HILL FARMS','ORIENTAL INTERNATIONAL TRADING','ORIGINAL JUMPING PILLOWS LLC','OUTCROP SPECIALTIES','PACIFIC COAST HARDWOODS','PACIFIC NORTHWEST COIN PRODUCTS','PAK-IT DISPLAYS INC.','PALLADEO EQUIPMENT','PALMER MANUFACTURING INC.','PAN AMERICAN FOOD AND MEAT EQUIPMENT','PAN PAC INTERNATIONAL INC','PARKER BROTHERS','PASQUALES','PAVE TILE WOOD & STONE','PC PRODUCTS','PCS OF MASSACHUSETTS','PEACH STATE DISTRIBUTING COMPANY','PERSONALIZED BOTTLE WATER','PEST EXPRESS','PETERSON MACHINERY SALES','PHOENIX METAL PRODUCTS INC.','PINES DISTRIBUTION LLC','PINNACLE PRODUCTS','PIONEER LOG SYSTEMS','PITTSBURGH STAGE INC','PLASTIC TUBING INDUSTRIES INC','PLUMBER&APOS;S SUPPLY','PLYMKRAFT INC.','POINT 6','POLY WORKS','POLYMER LOGISTICS','POLYTRADE INC','POWDERS UNLIMITED LLC','POWERLUX CORP','PREMIUM SUPPLY','PRIMARCH MANUFACTURING INC','PRINTING SOURCES INC','PRO FLOORS LLC','PROCOAT PRODUCTS','PROFESSIONAL AUDIO DESIGN','PROLONG TOOL','PROSOURCE PACKAGING','PROTECTIVE INDUSTRIAL PRODUCTS','PROTOCOL VENDING','PROVISION HEALTH CORP','PRT INC','PUZZLED INC.','QUALITY PIPE PRODUCTS INC','QUARTER-SAWN FLOORING','QUOC VIET FOODS INC.','R-CO PRODUCTS','R.F EDERER','R.L. WILLIAMS COMPANY','RADFISH SUP','RAINBOW FLYING SERVICES','RAKI COMPUTERS','RAN-TECH ENGINEERING','RASMUSSEN AIR & GAS ENERGY','RAY-CORE','RDS SPORTS INC','RECYCLE TECH CORP','REEVES SUPPLY MANUFACTURING','RELIANCE CARPET CUSHION','RELIANCE TOOL & ENGINEERING','REMARC VENDING LLC','REMELT SOURCES INC.','RENICK MILLWORKS','REO-USA INC','REP-QUIP.COM','REPETE PLASTICS','RICH INDUSTRIES INC.','RICH LTD','RICHMOND MARBLE & GRANITE','RICO INDUSTRIES LICENSED','RIDER BEST INC','RIVER VALLEY PAPER COMPANY','RLD TRANSPORTATION','ROBERT JULIAT','ROCK SOLID HARDWOODS INC','RODRIGUEZ BROTHERS MEMORIALS','ROGER&APOS;S AUTO PARTS INC','ROGUE STAND UP PADDLEBOARDS','RONTEX AMERICA INC','ROSS SPECIAL PRODUCTS INC.','ROSS VENDING','ROYAL EXCLUSIVE','RSR CORP','RUGG MANUFACTURING CORP.','RUGGERS INC','RUSSELL PARTITION LLC/ ATLANTIC PULP LLC','RUSSELL R PETERS CO','RUSTY ACRES AUTO SALVAGE','RW WHEATON CO','RYDER CONSULTING LTD','S& B CANDY & TOY','SAMAYAS ECO FLOORING','SAN FRANCISCO HERB & NATURAL FOOD','SANTA FE RANCH','SCHAFER HARDWOOD FLOORING','SCS DIRECT INC','SEATECH BIOPRODUCTS','SEBCO INDUSTRIES','SECURITY SAFE','SEE MATERIALS','SEMINOLE AUTO SALVAGE','SERVICE CANVAS','SEYMOUR AUTO WRECKING','SHARK INDUSTRIES','SHE&APOS;S THE SHIPPER','SHEER CORP','SHOWLINE INC.','SHRINK TECH SYSTEMS LLC','SIDUMP&APOS;R TRAILER','SIGNS BY WEB','SKUDO USA INC','SLATE SELECT INC','SMART RINK','SMITH AUTO PARTS & SALES INC','SNOWMAN COOLERS','SOLHUTEC GROUP INC.','SONO','SOUND MARINE DIESEL','SOUTH COUNTY ROCKERY & BUILDING MATERIALS INC.','SOUTHERN FARM SUPPLY INC','SOUTHERN GROUP USA','SOUTHERN HOBBY SUPPLY','SOUTHLAND PLUMBING SUPPLY','SOUTHWEST HARDWOOD FLOORS','SPA CREST MANUFACTURING','SPANCRAFT','SPARTAN PRINTING INC','SPEC CERAMICS INC.','SPECIALIZED PLASTICS INC','SPECIALTY ADHESIVE FILM','SPECIALTY PRODUCTS RESOURCES','SPECIALTY ROLLED METALS','SPECTOR TEXTILE PRODUCTS','SPEEDWAY TILE','SPERRY&APOS;S AUTO PARTS','ST. CLAIR PACKAGING INC','ST. FRANCIS PACKAGING','STAGG&APOS;S AUTO PARTS','STAND ON LIQUID','STANDARD MODERN CO. INC.','STARCO INCORPORATED','STARK INDUSTRIES','STATIC SOLUTIONS','STERLING ENG & SERVICE','STILES AND HART BRICK COMPANY','STONEWOOD FLOORING LLC','STOVE BUILDER INTERNATIONAL INC.','STROMBERG MOORE HARDWOODS','SUMMIT MANUFACTURING CORP','SUMMIT PAPER CONVERTING','SUN AUTO SALVAGE','SUNBELT DISPLAYS','SUNBELT METAL','SUPERIOR INFLATABLES','SUPERIOR MFG CORPORATION','SUPERMARKET LIQUIDATORS','SURFING SPORTS','SUSPENDED AQUATIC MENTOR','SYMPHONY TABLES','SYNEX FLUX','SYSTEMS SPECIALTIES INCORPORATED','SZP INC','T & L LIFT EQUIPMENT','TAHOE BOARDWORKS INC','TAMARA COLE ENTERPRISES','TANA-TEX INC.','TAUBEN FLOORS','TEAM PLASTICS','TECH SYSTEMS','TECHNICAL TATTOO SUPPLY','TECHNOGEL','TEMTEK SOLUTIONS INC.','TERRAZZO STONE SUPPLY/ NORTHWEST MARBLE','TEXTILE AND INDUSTRIAL SALES INC','THE CEMENT TILE SHOP','THE FREY COMPANY BIG ROCK SUPPLY','THE KISSNER GROUP','THE NEW SPECIALTY LIFT TRUCK','THE OLIVE OIL FACTORY','THE RUBBER GROUP','THE TASSOS GROUP LLC','THE WHOLE HERB COMPANY','TIGERCO DISTRIBUTING COMPANY','TILE EMPORIO COLLECTION','TIMBERLINE HARDWOOD FLOORS','TING LONDON','TLE MFG CORP','TOLEDO BAG','ELITE DIESEL SERVICE','ELITE ENVELOPE','EMPIRE DISCOUNT','EMULSO CORPORATION','ENERGY EQUIPMENT','ENGINE WORLD HOUSTON','EPIC BOARDSPORTS','EPOCH PRESS','EQUIPMENT EAST','ESCA INDUSTRIES LTD.','ESL HARDWOOD FLOORS','EURO INTERNATIONAL','EUROPEAN AUTOMOTIVE GROUP','EUROPEAN TILE ART','EXPANDED SUPPLY PRODUCTS','EXQUISITE SURFACES','EXTRA MILE TRANSPORTATION LLC','EXTREME KITCHEN & BATH INC.','FA INTERNATIONAL STONE','FAB OHIO','FABRICATED GRATING PRODUCT INC','FAMILY TREE FUNDRAISING LLC','FAT BRAIN TOY CO','FEEZLE AUTO WRECKING','FERNANDO&APOS;S BAKERY','FIBAR GROUP LLC','FIGUEROLA LABRATORIES','FILTRATION PRODUCTS','FIRST PLASTICS CORP.','FIRSTBROOK FINE WOOD FLOORS','FLAVOR CRISP','FLOOR SWEEP INC','FLOORING ALTERNATIVES','FLORIDA PADDLESPORTS INC','FLUOROPOLYMER RESOURCES LLC','FOODS ALIVE INC.','FORMER FAB INC','FORSTA FILTERS','FRANK LOWE RUBBER & GASKET CO','FREEDOM CLIMBER','FREIGHTMAN','FRONTIER EQUESTRIAN OF MISSOURI INC','FRONTIER PAPER & PACKAGING','FRONTIER STONEWORKS','FROZEN DESSERT SPECIALISTS','G & G PRODUCTS LLC','GADGE USA INC.','GARYS AUTO SALVAGE','GATOR INTERNATIONAL','GATTERDAM INDUSTRIAL SERVICE','GEMSTAR STONEWORKS','GENESIS DISPOSABLES','GIBBY AUTO PARTS','GIFT PRO INC','GK PAPER COMPANY','GLAZZIO TILES/MIRAGE','GLOBAL AMICI','GLOBAL HARDWOOD & SUPPLIES','GLOBAL MERCHANTS INC','GLOBAL VENDING GROUP INC.','GLOBAL VR','GODS GARDEN PHARMACY','GOYETTES','GREAT BRITAIN TILE INC','GREAT LAKES CORDAGE INC.','GREAT LAKES FINISHING INC','GREENBAY II HARDWOODS','GREENPAGES TECHNOLOGIES SOLUTIONS','GREGCO COMMERICAL DOOR COMPANY','GREY SAIL BREWING COMPANY','GROWOP TECHNOLOGY LTD','GUARANTEED LABELS & SILKSCREENING','GUARANTEED POWER INT.','GUM TECHNOLOGY CORPORATION','GW FOOD MACHINERY','H & B ELEVATORS','H.A FRANZ','HARBOUR MARINE SYSTEMS INC','HART SUPPLY COMPANY','HARVEST TRADING GROUP','HAT CREEK INTERIORS','HEALTH AID AMERICA','HEDSTROM ENTERTAINMENT','HEIDELBERG WOOD FLOORING CO','HEINSOHN&APOS;S COUNTRY STORE','HELI AMERICAS','HEPPNER HARDWOODS','HERB GARDEN PRODUCTIONS','HIGH FIVE ELECTRONICS','HIGH-TECH CONVERSIONS INC.','HIGHLIGHT INDUSTRIES','HIGHWAY MATERIALS INC','HIPPO CORP','HOBOKEN FLOORS LLC','HOUSTON WIRE WORKS','HRI VENDING','HUNTERS COMFORT USA','HWY 50 AUTO PARTS','HYBRID CASES','HYDROPONICS DEPOT','HYPERLINE','ICE - INDUSTRIAL COOLING EXCHANGE','ICE COURT LLC','ICON STONE INC','IJUMPER INC.','ILLING COMPANY INC.','IMPACT ABSORBENT TECHNOLOGIES','INDIANAPOLIS STAGE','INDUSTRIAL CONTROL & SUPPLY','INDUSTRIAL PUMP','INFINITE HARDWOOD DISTRIBUTOR','INFINITY PLASTICS','INFLIGHT DIRECT','INLAND VAC & AIR SERVICES','INNOVATIVE CONCEPTS IN ENTERTAINMENT INC.','INNOVATIVE DESIGNS INC','INPAC INC','INTEGRATED-AQUA INC','INTERLINK LOGISTICS','INTERNATIONAL FOREST COMPANY','INTERNATIONAL MOTOR SPORTS','INTERNATIONAL PRECISION COMPONENTS CORPORATION','ISLECHEM LLC','IWEISS THEATRICAL SOLUTIONS','IZZI BATH & SPA MANUFACTURING','J R PLASTICS','J&J AUTO SALVAGE','J&J AUTO WRECKING','J-RON INC.','JACKS PLASTIC WELDING INC','JANSON INDUSTRIES','JARRAL','JBS PRINTING LLC','JEAN&APOS;S RESTAURANT SUPPLY','JET MICRO CORP','JLC TECH','JMB EQUIPMENT LLC','JOMAC LTD','JOYSTIX CLASSIC GAMES','JP STEEL','JUNIOR SINN AUTO PARTS','JUPITER KITEBOARDING','KALEIDOSCOPE FRAMING','KAROLINA DOMINOVIC','KECO INC USA','KEITH AUTO RECYCLERS','KENNY&APOS;S TILE','KEY STEEL WIRE','KING STEEL CORPORATION','KINGS&APOS; PADDLE SPORTS','KINNUX CORP','KOBI TOOLS','KS OF WEST VIRGINIA','KYKENKEE','LABELLE BOTANICS','LANIER MARINE LIQUIDATORS INC.','LARSEN ENVELOPE','LAS VEGAS LOGISTICS','LAWRENCE INDUSTRIES','LEED FABRICATION SERVICES INC.','LEEUS COMPANY','LIBERTY FIBERGLASS','LIFE STYLES FURNITURE','LIFT & TOW','LIFT SOUTH INC.','LINCOLN FINE INGREDIENTS','LITTLE & COMPANY INC','LJ WALCH','LNL BUILDING PRODUCTS','LOFTNESS ATTACHMENTS','LOGI-TEC INC','LONG PLAN PRINTING','LONGUST DISTRIBUTING','LOUISIANA CYPRESS SWINGS & THINGS INC','LOWELL GRANITE COMPANY','LOWRY MANUFACTURING','LUCERO OLIVE OIL','LUX DYNAMICS CORP','LYNX COMMUNICATIONS','M&G PACKAGING CORP','M-KEY MARKETING INC.','MABEY BRIDGE & SHORE','MAC DIVITT RUBBER','MACHINE BUILDERS DIRECT','MADISON TOOL & DIE','MAGNETIC TICKET & LABEL CORP','MAIN AWNING & TENT INC','MAINE WOOD HEAT CO','MAK LOGISTICS & TRANSPORT LLC DBA SD INDUSTRIES M','MALONE PADDLE GEAR LLC','MAMMOTH MEDIA','MANN HOLLY SALES & SERVICE','MARSHALL PAPER TUBE','MARX BROTHERS INC','MASS FINISHING INC.','MASTERS HARDWOOD FLOORING','MATERIAL HANDLING SUPPLY','MATRIX CABINETS','MAVERICK BLINDS','MAXLINE CUSTOM CASES INC','MAZER WHOLESALE INC.','MCCLUNG-LOGAN EQUIPMENT COMPANY INC','MEDALLION POOLS','MEGAMET INDUSTRIES INC','MEMORIAL ART COMPANY','MERCURY','MERIDIAN TRADING CO','METAL PRO CORPORATION','MEXICAN TILE & STONE CO','MGR DESIGN','MIAMI STONE DISTRICT','MICHAEL&APOS;S ELECTRIC SUPPLY','MICROPOWER BATTERY','MIDWEST FLOOR COVERINGS','MIKE&APOS;S AUTO PARTS','MILLWORK OF IDAHO','MIRACLE EXCLUSIVES','MITTS NITTS INC','MIYAMA USA','MJS PACKAGING','MKC GOLF LLC','MODERN OFFICE FURNITURE','MOLDED MAGNESIUM PRODUCTS LLC.','MONACO','MONKEYS ARCADES','MORGAN-FRANCIS FLAGPOLES & ACCESSORIES','MORGANTON PRESSURE VESSELS','A-Z ENTERPRISES','A. N. SMITH & COMPANY','AARON AUTO','ABB CONCISE','ABLE INDUSTRIAL PRODUCTS','ACCU-LABEL INC.','ACE SIGNS INC','ACEY-DECY EQUIPMENT CO','ACTION PLASTICS','ACU-MARKET','AD CETERA INC','ADAMS ASSOCIATES','ADAMS GRANITE COMPANY','ADDEX','ADVANCE COATINGS','ADVANCED COMPRESSED AIR SOLUTIONS','ADVANCED EQUIPMENT INC','ADVANCED GOURMET','ADVANTAGE BOTANICALS','ADVANTAGE FOOD EQUIPMENT','AES CORP','AGUERA DESIGNS','AIR ENERGY INC.','AIR TECH INCORPORATED','ALL AMERICAN SUPPLY','ALL STATES INC.','ALLIANCE IN MANUFACTURING LLC','ALLMAN PRODUCTS INC','ALLY GLOBAL LOGISTICS','ALMOST HEAVEN SAUNAS LLC','ALP INDUSTRIES','ALTERNATIVE RUBBER AND PLASTICS','ALTRU WOOD','AMAZING MACHINERY','AMAZON WOOD FLOORS','AMBROSIUS AUTO PARTS','AMERIBEST FASTENERS','AMERICAN DREAMS INC','AMERICAN HARDWOOD','AMERICAN SODA FOUNTAIN','AMERICAN WAREHOUSE EAST','AMERITEMP LTD','AN DERINGER','APEX HARDWOOD FLOORS','APEX MACHINERY','APOLLO POWER INDUSTRIAL','ERS APOLLO','ERS 2 Enterprise','ERS 3 Enterprise','ERS 112','Wendover Art Group','APOLLO POWER INDUSTRIAL COMPARE','Piedmont Import Test','Piedmont Import Test - 20','Piedmont Import Test - 10','Piedmont Import Test - 2010','Piedmont Import Test - 2020','Piedmont Import Test - 30','Piedmont Import Test - 40','Peterson Solutions','Peterson Solutions COPY','Peterson Solutions COPY','Peterson Solutions COPY','Peterson Solutions Account','Peterson Solutions Account','Peterson Solutions COPY','Peterson Industrial','Peterson Industry','Peterson Rocket Systems','Peterson Solutions COPY','Peterson Solutions COPY','Peterson Rocket Systems','Peterson Rocket Systems','Peterson Pottery','JoBus Rum Solutions','Peterson MerchantServices','GKR Enterprises','GKR Enterprises 2','GKR Enterprises - BSB','GKR Enterprises 2','GKR Enterprises - Non MIQ','GKR Enterprises - BSB 2','GKR Enterprises REMS','GKR Enterprises - Fran test','GKR Enterprises - Sync test','Peterson MerchantServices2','Peterson Baby Products','Peterson Beet Farms','Peterson Alpaca Lips Now','Peterson Okay Yachts','Peterson Fried Chicken','Peterson Aerospace','APOLLO POWER INDUSTRIAL P44','APOLLO POWER INDUSTRIAL P44 Child A','BlueShip Test Automation','JB Technology Group','JB Technology Group','Josh B Shipping','JvB Shipping','BlueShip Automation','BlueShip Automation - Add Test','BlueShip Automation - Add Test','BlueShip Test Automation','BlueShip Test Automation','BlueShip Test Automation','BlueShip Test Automation','BlueShip Test Automation','BlueShip Test Automation','BlueShip Test Automation','BlueShip Test Automation','BlueShip Test Automation','BlueShip Test Automation','BlueShip Test Automation','BlueShip Test Automation','BlueShip Test Automation','BlueShip Test Automation','BlueShip Test Automation','BlueShip Test Automation','BlueShip Test Automation','BlueShip Test Automation','BlueShip Test Automation','BlueShip Test Automation','BlueShip Test Automation','BlueShip Test Automation','BlueShip Test Automation','BlueShip Test Automation','BlueShip Test Automation','BlueShip Test Automation','BlueShip Test Automation','BlueShip Test Automation','BlueShip Test Automation','BlueShip Test Automation','BlueShip Test Automation','BlueShip Test Automation','BlueShip Test Automation','BlueShip Automation-NonMatrixIQ','BlueShip Test Automation','BlueShip Test Automation','BlueShip Test Automation','BlueShip Test Automation','BlueShip Test Automation','BlueShip Test Automation','BlueShip Test Automation','BlueShip Test Automation','BlueShip Test Automation','BlueShip Test Automation','BlueShip Test Automation','BlueShip Test Automation','BlueShip Test Automation','BlueShip Test Automation','BlueShip Test Automation','BlueShip Test Automation','BlueShip Test Automation','BlueShip Test Automation','BlueShip Test Automation','BlueShip Test Automation','BlueShip Test Automation','BlueShip Test Automation','BlueShip Test Automation','BlueShip Test Automation','BlueShip Test Automation','BlueShip Test Automation','BlueShip Test Automation','BlueShip Test Automation','BlueShip Test Automation','BlueShip Test Automation','BlueShip Test Automation','BlueShip Test Automation','BlueShip Test Automation','BlueShip Test Automation','BlueShip Test Automation','BlueShip Test Automation','BlueShip Test Automation','BlueShip Test Automation','BlueShip Test Automation','BlueShip Test Automation','BlueShip Test Automation','BlueShip Test Automation','BlueShip Test Automation','BlueShip Test Automation','BlueShip Test Automation','BlueShip Test Automation','BlueShip Test Automation','BlueShip Test Automation','BlueShip Test Automation','BlueShip Test Automation','BlueShip Test Automation','BlueShip Test Automation','BlueShip Test Automation','BlueShip Test Automation','BlueShip Test Automation','BlueShip Test Automation','BlueShip Automation-PrePay-BSB','BlueShip Automation - Add Test','BlueShip Automation-BSB','BlueShip Automation-BSB-2','BlueShipAutomation-WebSvcs-HideCost','Peterson Solutions COPY','ERS 3112','Integration MatrixIQ','ERS 42717','Peterson Pottery','DevOpsQA1','Ansonville QA','Peterson Industrial','Apollo Power Industrial ERS','Apollo Power Industrial ERS COPY2','Apollo Power Industrial ERS COPY2 COPY','Apollo Power Industrial 12334','Apollo Power Industrial 45235','ERS TEST 7919','Apollo Power Industrial 716','APPLIED LASER TECHNOLOGIES','ARCHITECTURAL SPECIALTIES INC.','ARMSTRONG MACHINE CO','ART OF CLOTH INC','ARTISTIC STONE WORKS AND CABINET','ASPEN INDUSTRIES INC','ATLANTIC FLOATING DOCKS LLC','ATLAS CONSTRUCTION SPECIALTIES','ATLAS MACHINE & SUPPLY','AUBERT & DUVAL USA','AURORA INDUSTRIAL SUPPLIES','AUSTIN SCREEN PRINTING','AUTO OUTLET INC','AUTO PARTS DIRECT','AV AUTO PARTS','AVID AIRLINE PRODUCTS','AZURE STANDARD','B R FUNSTEN & TOM DUFFY CO','B&B ENTERPRISES','B&M NOBLE','BAKERY EQUIPMENT SERVICES','BARCODE TRADING POST','BARISH PUMP','BARRONS WHOLESALE TIRE INC','BASSYAKS LLC','BATAVIA MACHINERY','BAYSIDE CRANE AND RIGGING SERVICES','BEARS2GO.COM','BECK OIL FIELD SUPPLY','BEKO TECHNOLOGIES','BERMAN INDUSTRIES','BEST OF NATURE LLC','BEST ONLINE CABINETS','BESTEK INDUSTRIES','BI NUTRACEUTICALS (WEST)','BIG FITNESS INC','BIO 2 INTERNATIONAL','BIRCHWOOD BEST','BLASTING MATERIALS & EQUIPMENT INC.','BLUE SKY SAFES / STRATTON SAFES','BLUEDROP WATER','BOADIE L. ANDERSON QUARRIES INC.','BODY DESIGN FITNESS','BONDTECH','BOSTON PACK AND SHIP','BOUNCE TIME INFLATABLES','BOXES ETC INC','BOYET MANUFACTURING','BRAMBLETT AUTO PARTS','BRAZOS VALLEY RECLAIMED','BRICKYARD BUILDING MATERIALS','BRODHEAD COLLARSHOP','BROOKLYN SPECIALTIES LLC','BROOKSIDE IMPORT SPECIALTIES','BROWN LOGISTICS SERVICES INC.','BRUCELLI ADVERTISING','BULK HERB STORE','BUMDRUMS LLC','BUNK BED BUY','BUSY BEE AUTO SALVAGE','BUTLER FLOOR COVERING','BUTTE PRODUCE & SUPPLY CO','C C POLLEN','CABLETECH SLING & SUPPLY CO.','CAL WOOD FLOORING','CAL-WEST','CALUWE INC','CAMPBELL LIGHTING','CAMPUS MARKETING SPECIALISTS','CANDY DYNAMICS','CARD ACCESS INC','CARDINAL COMB & BRUSH','CARNEY PLASTICS','CAROLINA WIRE & CASTINGS','CARRIAGE TRADE SERVICES CO','CARROLL COMPANIES','CARWASH UNLIMITED','CASCADE AUTO WRECKING','CASE CONCEPTS','CASTLEWOOD CORPORATION','CATE INDUSTRIAL','CEDAR BEAR NATURALES','CEDAR RAPIDS TRANSMISSION','CEM LIFTS INC','CENTRAL PARTS INTERNATIONAL INC.','CERAMICA SAN LORENZO','CHALFANT SEWING FABRICATORS INC.','CHAMPION HOODS & PRODUCTS','CHANGE PARTS','CHEMA TECHNOLOGY INC','CHERMACK MACHINE INC','CHEYENNE COMPANY','CHIA ORGANICA INC','CHICAGO GAMING CO.','CHICOPEE ENGINEERING ASSOCIATES','CHILL KING','CIMARRON SIGN SERVICES INC','CINCINNATI CONVERTORS','CLARK FOAM','CLEARWATER PACKAGING INC','CMC AMERICA','COLES TRACTOR & EQP INC','COMPRESSION SOLUTIONS','CONNECTICUT PLASTICS INC','CONNECTRONICS','CONSTRUCTION MATERIALS LIMITED INC','CONTINENTAL MATERIALS INC','CONTROLLED FLUIDICS INC.','COOKIE SPECIALTIES INC','CORONA HARDWOODS','COTTON VALLEY HOME INC.','COULBOURN INSTRUMENTS','COUNTRYSIDE MANUFACTURING','CP TECHNOLOGIES COMPANY','CRAFTMARK SOLID SURFACES','CRAVEN POTTERY INC','CRAWFORD MANUFACTURING','CREATIONS GARDEN NATURAL PRODUCTS','CREATIVE ASSEMBLY SYSTEMS','CREATIVE ENGINEERING CONSULTANTS','CREATIVE FUNDRAISING IDEAS','CREATIVE PACKAGING','CREATIVE WORKS INC.','CSU INC.','CTD MACHINES','CULLEN GRACE ARCHITECTURE','CURLEY&APOS;S AUTO PARTS','CUSTOM CARE EQUIPMENT','CUSTOM CASTINGS NORTHEAST INC','CUSTOM CREATIVE PLASTICS','CUSTOM SERVICE PLASTICS INC','D & D COMPRESSORS','DAEJIN AMERICA INC.','DAIRYLAND SCIENTIFIC','DARE PRODUCTS','DARWIN CHAMBERS COMPANY','DASCO MANUFACTURING CO.','DAVIS MULLER LIGHTING','DECOPRINT OF CHATTANOOGA','DEER CREEK AUTO PARTS','DELINE BOX & DISPLAY','DELTA INDUSTRIES INC','DEMOPOLIS HICKORY MILL INC','DEPENDABLE COMPONENT SUPPLY','DESALES TRADING CO. INC.','DESERT EAGLE FLOORING','DESTIN SUNRISE MARINE','DETECTABLE WARNING PRODUCTS','DETECTABLE WARNING SYSTEMS','DETECTILE CORPORATION','DH WELDING','DIAMOND BUCK LLC','DIAMOND GRAPHICS INC','DIGGA NORTH AMERICA INC','DIRT DOG MANUFACTURING','DISTINCTIVE HARDWOOD FLOORS','DIVERSIFIED AIR SYSTEMS','DNG TRADING AND MILLING USA','DNJ AUTO PARTS','DON SCHARF AUTOMOTIVE INC.','DONPER AMERICA','DOUG&APOS;S AUTO RECYCLERS','DOYLE SHAMROCK','DRACO NATURAL PRODUCTS','DRINKABLE AIR','DURA MOLD','E AUTO TOOLS','E Z FINISHES INC.','E-MAT','EAST COAST GAME ROOMS','EAST COAST GARDEN WHOLESALE','EAST COAST WATER SYSTEMS','EAST END FOODIES INC','EAST LAKE ALTERNATIVE ENERGY','ECLECTIC MOTORS','ECO FOUNDATION SYSTEMS','ECONOMY AUTO PARTS','EDEN STONE','ELECTROBRAID FENCE LTD.','ELEMENTAL HERBS','ELEPHANT GROUP INC.','Todd Devin Food Equipment','Hoelewyn Auto Salvage','Midwest Container & Industrial Supply','Converd','Dongyu Usi','Viking-Industries','AIKEN MANUFACTURING','CALIFORNIA OPTICS','CAVEMAN PLASTICS','CHICAGOLAND EQUIPMENT','CLARKE CONTAINER INC','COMPLETE STORE FIXTURES','CROWN CASTORS INC','CURIOUS GOURMET','EQUIPMENT EXCHANGE CO','FLUID CHILLERS INC.','GET CHIA INC.','GOURMET BLENDS','HOLE PRODUCTS','INFINITY SURF','INTEGRATED POLYMER SYSTEMS','K AND Z DISTRIBUTING CO.','KINETIC FOUNTAINS / SPECIALTY LIVING INC.','KING LUMINAIRE CO','LOVE HOT DOG CO.','LURVEYS LANDSCAPE SUPPLY','MANUFACTURER&APOS;S RUBBER & SUPPLY CO.','NEW PHASE','OEM PARTS & TOOLS COMPANY','PAK-LITE INC','PORTELL RESTORATIONS','RJD INDUSTRIES INC','VEI REBUILDING','WESTGATE AUTO PARTS','AGRI ENERGY RESOURCE','Air Cleaning Technologies','ALBERTS USED AUTO PARTS','ALLIANCE PAPER COMPANY','ALMOND SURFBOARDS & DESIGNS','AMERICAN SUPER SPORTS / KRISTAL SPORTS','ANDREW LEBLANC CO.','ANYTIME PRODUCTS','AQUA SYSTEMS INC','ARMOR PRODUCTS MANUFACTURING INC','ARNOLDS OFFICE FURNITURE','ASE INDUSTRIES','AUSTIN VEE DUB','BAZOOKA FARMSTAR INC.','BEESLEY INTERNATIONAL INC','BETSON ENTERPRISES','BIOACTIVE RESOURCES LLC','BRAMCO','BULBTRONICS','C & M TOPLINE INC.','CABLE TECHNOLOGIES INTERNATIONAL','CALIFORNIA ACCENT LIGHTING','CALIFORNIA FLOORING EXPRESS','CAPE FEAR SYSTEMS III LLC','Carbon Resources','CENTRAL PENN SEWING','CHERRYVILLE DISTRIBUTING CO INC.','CMS MAGNETICS','COLORCO LTD','COOKIN PELLETS','CRYSTALINE STONE','CSI PLASTICS','CUSTOM FIREPLACE SHOP','DAVLYN MFG CO.','DEHUMIDIFIER CORPORATION OF AMERICA','DELONG EQUIPMENT COMPANY','DIRECT BUY KITCHEN & BATH','DIVERSUS INC','DOUGLAS PRODUCTS','DRG MOLDING CO','DUCKY&APOS;S AUTO PARTS INC','DURUM USA','E BEAVER & CO.','EAST COAST SLOTS','EAT MORE TEES','EDGEWOOD BUILDING SUPPLY','EMPOWERED PRODUCTS','ENVELOPE SOLUTION','ENVIROPEEL USA','EUSTIS CHAIR','EZ PACK','E-Z PRODUCTS INC','FARM AID EQUIPMENT INC.','FLOW CENTER PRODUCTS','FLOWER CITY TISSUE MILLS CO','FOOTHILLS TILE & STONE COMPANY','FOXY MANUFACTURING','FRAME OF MIND','G Y PACKAGING','G&L ASSOCIATES','GARDEN SPOT DISTRIBUTORS','GINNOW EQUIPMENT & SPECIALITY','GOLD COAST INTERNATIONAL','GOLD GLASS GROUP CORP','GRANDVIEW PRODUCTS INC','GREEN INDUSTRIAL LLC','GREEN MANUFACTURING INC.','GREEN POINT AUTO SALVAGE','GW INDUSTRIES','HAYWARD BAKER INC.','HEARTLAND SIDING BY PROVIA','HEELY-BROWN COMPANY','HIGH PERFORMANCE ENGINEERING','HIGHLAND COMPANY LLC','HINDS-BOCK CORP','HOME CINEMA CENTER','HOUSTON GAME REPAIR','HYDRO ENTERPRISES INC','I-80 AUTO PARTS','IDIDIT INC.','IROCK CRUSHERS LLC','IVEY CARPET','KAYAK EXCURSIONS','KENNEDY WIRE ROPE & SLING CO','KENTAK','KITCHEN QUEEN LLC','KRAFT POWER','LA COLOMBE','LEXAIR INC.','LTS ENERGY LLC','LUNDEBY MANUFACTURING','M&G CORE RECOVERY','MAPCARGO BOSTON','MARLINS CONSOLIDATORS','MASS SIGN','METAL SPECIALTY SYSTEMS INC','Missouri Hardwood Products','MSS SALES','MUNICIPAL SALES INC/ SEPTIC DRAINER','MURPHY BEDS DIRECT','NORAMPAC SCHENECTADY INC.','NORTH AMERICAN CAST IRON PRODUCTS','NORTH CENTRAL AIR COMPRESSORS','NORTHEASTERN ENVELOPE COMPANY','OEHME VAN SWEDEN & ASSOCIATES INC','OEM TUBE ASSEMBLIES','OMAHA NEON','PACIFIC TRAIL MANUFACTURING','PIONEER SUPPLY LLC','PRO CASES INC.','PULVA CORPORATION','PYRAMID PACKAGING','ROHA USA','ROYAL ARCHITECUTRAL PRODUCTS','ROYAL PUBLICATIONS','RTS COMPANIES','RV SURPLUS','SAROYAN LUMBER','SCOVIL & SIDES HARDWARE CO','SHAKER HILL GRANITE','SHEYENNE TOOLING & MANUFACTURING','SIR WEBBING INC','SOFT SURFBOARDS INC','SOURCELINK','SPIEL ASSOCIATES','SPJ LIGHTING','SPORT RESOURCE GROUP','SPOTLIGHT GRAPHICS','STANDARD EQUIPMENT CORP','SUNCOURT INC.','SUNLIGHT SHEDS','SWEET FARM EQUIPMENT','TECNO DISPLAY INC.','TELESIS INC/ DATA SECURITY INC','THE ELECTRIC BARN','THOMAS MOTORS & SALVAGE','TIGER INDUSTRIES INC','TOFF INDUSTRIES','TRIANGLE ENGINEERING','TRIO ENGINEERED PRODUCTS','UNITED BAGS INC.','United Industries Inc','UNITED KAI','VIRON INTERNATIONAL CORP','WALKER BAG MANUFACTURING CO','WILLIAMS STONE CO. INC.','Apollo Power Industrial QA','ERS Co.','ERS Copy Company','ERS Co 3 Modified','JB NoMatrixIQ 1','ERS 311','Apollo Power Industrial COPY','CJS Co.','ERS CO 2','MPS','HEREINMYGARAGE','SSME','Another Apollo Copy','BlueShip Test Automation','BlueShip Test Automation','Arjun Industries','Peterson Relationship Inherit Bug','BlueShip Test Automation','BlueShip Test Automation','BlueShip Test Automation','BlueShip Test Automation','BlueShip Test Automation','BlueShip Test Automation','BlueShip Test Automation','BlueShip Test Automation','BlueShip Test Automation','ERS 3818','timmeh','Meowington_1','Apollo Power Industrial 4443','Rocketdyne Unassigned','Peterson Independent','The Starship','Hardy Boys Inc','MEDALLION','Apps Associates DEMO','Agent- David Serna- Terminated','Agent- Leslie Perkinson-Terminated','Group- Navegate (910) ***','General Belt**MATRIX IQ**','Anchor Sandblasting','Aaron Equipment Company','Ace Industrial Equipment',' Inc','ASSOCIATED PACKAGING TL','BCS Switchgear','Ace Medical','COOL GLOW','Cargo Chief','Cortech USA','D-Zee Textiles',' LLC','CRT Custom Products','Earleys Apparel *** PRE PAY ***','Econocaribe','OTI Cargo***','OTI Cargo Agents QUOTING***','Kool Logistics','EMPIRE EMBROIDERY','Its Promo Time','Its Promo Time','Its Promo Time','Its Promo Time','Its Promo Time','Its Promo Time','Its Promo Time','Its Promo Time','Its Promo Time','Its Promo Time','Its Promo Time','Its Promo Time','Its Promo Time','Its Promo Time','Its Promo Time','Its Promo Time','Its Promo Time','Its Promo Time','Ferguson 3***','Final Freight LLC','Its Promo Time','Franchise-  Lousiana SouthWest (811)','Kelly Test Company LLC','Its Promo Time','Its Promo Time','ACME Sign Company',' LLC','La-Tex Rubber & Specialties',' Inc','Lousiana SouthWest 25***','Jaci Test Company','Joel Test Company LLC','Juan Test Company LLC','Jaci Test Manufacturer','Kelly Test Manufacturer','Yvonne Test Company LLC','Black Diamond Slate','GoByTruck','HnM Express','Its Promo Time','Its Promo Time','Jeff Lavallee (701)','Logistic Dynamics Inc','NIPPON EXPRESS - IL (RYAN)','NS World Logistics','MNX Global Logistics','Mascot Pecan Shelling',' Inc.','Performance Plus Carts','On-Site Systems.','Oakfield Farms Solutions','Jerico Restaurant Equipment & Supplies','Pinnacle Marketing','Southeast Packaging And Sanitation','The Custom Companies Inc','Travers Tool CO','TRAVERS SC','TRAVERS NY','TRAVERS MEXICO','Wendys # 1696','Xpress Global Systems','A M Transport Svc','McNeils McNuggets','Shes A Manly Man','KOTOBUKI RELIABLE DIE CASTING','ORIGINATE NATURAL BUILDING MATERIAL SHOWROOM LLC','DOWNTOWN FORD SALES','BGL DEMO BRANCH 4','BSQA BlueGraceFF','2BG Forwarding Demo 5','BS TestCo','BSQA MANNA DISTRIBUTION SERVICES ','BGL DEMO BRANCH 3333','HIGH RISK SHIPPERS-OSR','Pricing Management Test Co','Pricing Management Test Co 2','GEOPOST','OWN AGREEMENT','ERS TMS','Test Customer Account','ERS TMS','BlueGrace Unassigned','BG BLANKETS AND FORWARDERS ALL','STEVE DAY ****','ERS Copy of Apollo','ERS0311311','ERS 915','BLUESHIPWebSvcTest','BLUESHIPQAWebSvcTest','BLUESHIPQAWebSvcTest2','BlueshipQACocaColaUnited','BlueshipQAAceHardware','BlueshipQAHeartlandCocaCola','SWIRE COCA-COLA USA','BlueshipQAJennieO','BlueshipQAMichaelFoods','BLUESHIPChildWebSvcTest','BLUESHIPQACADWebSvcTest','Meowington','Meowington_NM QA','Meowington_MIQ','Newmans Own','Meowington_MIQ2_Automation','Meowington_MIQ3','Meowington_MIQ4','Meowington_MIQ5','Meowington_MIQ6','Meowington_MIQ7','Meowington_NM_Special','Meowington_NM_AcctSp','Meowing From the Ashes_MIQ','Kristoffs Frozen Land','RamaTown','Meowington_NMOther','Albino Tree Frog Paper Mill','Young Jocs Taco Shop','Marco Polos Lost and Found','Barkville - REMS***','Barkville - REMS***TL','Joes Crab Shack','KevinTown','KevinDeleted','KevinDeleted','KevinTown20','KevinTown21','KevinTown22','KevinTown23','KevinTown24','KevinTown25','MonicaTown','KevinTown25','CDW Merchants','Toms Lawn Supplies','BlueShip Demo','Peepers Puppy Palace','Apollo Dispatcher','Apollo Dispatcher COPY ***','Anthonyville','APIAutomationNM','APIAutoNM','Bretts Dragon Land_MIQ','Woodville','Sheets of Fire','Sheets of Fire','Newmans Own_MIQ','ENTERPRISE TEST ENVIROMENT','Adama USA','Atticus',' LLC.','David Edward Company***','FANIMATION INC.','GATOR CASES TEST ACCOUNT','Gowan Company',' L.L.C.','Gowan Company Canada','Gowan Company',' L.L.C. (Bulk)','Joerns Recovercare','LDR Global Industries***','Lenny & Larry','LGH USA Inc Headquarters***','Rinnai America Corporation','TECHNICOTE INC','TAW-test','Torani','Tiger Drylac','Christine Taylor Collection','BLUESHIPQAElkay','Elkay Plastics - Commerce','Elkay Plastics - Kent','Elkay Plastics - Carrollton','Elkay Plastics - Aurora','Elkay Plastics - Austell','Elkay Plastics - Schaumburg','Elkay Plastics - Phoenixville','Elkay Plastics - Hayward','Elkay Plastics','BLUESHIPQASBravo','BLUESHIPQAThule','Mossberg & Sons',' Inc.','Popchips','BLUESHIPQAMillerZell','BlueshipQAPerformancePipe','BLUESHIPQAHaliburton','BlueshipQAAlkaline88','American Biltrite Inc','ABI Tape','Ideal Tape','BLUESHIPQAProMach','Bufkor','Custom Metal Products***','Woodtone Enterprises','Boral Import Test','Charger Water Treatment Products',' LLC.-Palm City','Fastenal ***TEST ACCT***','Madjax','BSQA Econocaribe','BSQA OTI Cargo','San Jamar ***','Sun Hydraulics Corp','PROGRESSIVE SPECIALTY GLASS CO.',' INC ***','Gator Cases Corp ***','Whitehall Products TEST','Whitehall Products TEST','Champion Labs TEST','Champion Labs - CA TEST','Champion Labs - MI TEST','Champion Labs - Bill Pay TEST','Champion Labs - IL TEST','Champion Labs - (Other Modes) TEST','DSC Logistics TEST','SC JOHNSON & SON',' INC. TL','BFY BRANDS TEST ENVIRONMENT','P AND G RYDER TEST ACCT','P AND G JDA TEST ACCT','Cascades WW TEST','Southwestern Wire**MATRIX IQ**','Dilaura Brothers**MATRIX IQ**','Slush Puppie Tri - State**MATRIX IQ**','Newman QA MIQ REMS','BlueGrace QA Automation','Werner Enterprises','Specialty Retailers',' Inc. ***','Newman QA MG','NewmanQA**MG**','NewmanQA**MG**','NewmanQA****TEST****'];

/*
    this.pcService.getCustomerProfiles().subscribe((res: any[]) => {
      this.GridData = res;
      this.GridDataAll = res;
      this.gridCount = res.length.toString();
    });
    */
      this.GridData = res;
      this.GridDataAll = res;
      this.gridCount = res.length.toString();

      this.enterpriseData = this.enterpriseDataAll;
 
  }

  ngAfterViewInit() {
    if (this.enterpriseAutoComplete.length === 1) {
      this.theEnterpriseAutoComplete = this.enterpriseAutoComplete.last;
    }
  }

    public setSelectableSettings(): void {
    this.selectableSettings = {
      checkboxOnly: true,
      mode: 'multiple'
    };
  }

  public handleEnterpriseFilterChange(filter: any): void {
    const searchResults = [];
    filter.trim();
    this.originalText = filter;
   this.enterpriseData = this.enterpriseDataAll.filter(s => s.toLowerCase().indexOf(filter.toLowerCase().trim()) !== -1);

  }

  protected handleEnterpriseValueChange(value) {

  }

  protected pageChange(event: PageChangeEvent): void {
    this.skip = event.skip;
    this.pageSize = event.take;
    this.setRecords();
  }
  protected sortChange(sort: SortDescriptor[]): void {
    this.sort = sort;
    this.setRecords();
  }
  private setRecords(): void {
    const records = orderBy(this.GridData, this.sort);
    this.gridView = {
      data: records.slice(this.skip, this.skip + this.pageSize),
      total: records.length
    };
  }

  public statusChanged(dataItem) {
    this.filterGridByDropdownValue(this.getFilter(dataItem));
  }

  private applyTableState(state: State): void {
    this.gridView = process(this.GridData, state);
  }

  public dataStateChange(state: DataStateChangeEvent): void {
    this.state = state;
    this.applyTableState(this.state);
  }

  protected searchFilter(search: string = null): void {
    search ? (this.GridData = this.GridData.filter(obj => this.filterDelegate(obj, search))) : (this.GridData = this.GridDataAll);
    this.pageChange({ skip: 0, take: this.pageSize });
  }

  private filterDelegate(obj: CustomerProfile, search: string): boolean {
    search = search.toLowerCase();
    return (
      (obj.accountName != null &&
        obj.accountName
          .toString()
          .toLowerCase()
          .indexOf(search) > -1) ||
      (obj.accountNumber != null &&
        obj.accountNumber
          .toString()
          .toLowerCase()
          .indexOf(search) > -1) ||
      (obj.enterpriseID != null &&
        obj.enterpriseID
          .toString()
          .toLowerCase()
          .indexOf(search) > -1) ||
      (obj.proactiveAuditNumber != null &&
        obj.proactiveAuditNumber
          .toString()
          .toLowerCase()
          .indexOf(search) > -1)
    );
  }

  protected viewDetails(e, dataitem) {

    this.showGrid = false;
    this.showChild= true;
    this.cdr.detectChanges();
  }

  private getFilter(filterText) {
    var filter;
    switch (filterText.toString()) {
      case 'Pro-Active':
        filter = { isProactive: true };
        break;
      case 'Non-Proactive':
        filter = { isProactive: false };
        break;
      case 'Open Book':
        filter = { isOpenBook: true };
        break;
      case 'Non Open Book':
        filter = { isOpenBook: false };
        break;
      case 'Open Book & Proactive':
        filter = { isOpenBook: true, isProactive: true };
        break;
      default:
        break;
    }
    return filter;
  }

  private filterGridByDropdownValue(filter) {
    this.GridData = this.GridDataAll.filter(function(item) {
      for (const key in filter) {
        if (item[key] === undefined || item[key] !== filter[key]) {
          return false;
        }
      }
      return true;
    });
  }

  confirmCreateNewEnterprise() {
    this.createEnterpriseConfirm = true;
  }
  closeDialog() {
    this.createEnterpriseConfirm = false;
  }
  canCreateNewEnterprise() {
    this.doesEnterpriseExist();
  }

  doesEnterpriseExist() {
    this.closeDialog();
    const doesExistAlready = this.GridDataAll.filter(enterprise => enterprise.enterpriseID === this.selectedEnterprise.enterpriseID);
    doesExistAlready.length > 0
      ? this.alertMessage.showAlertMessage('Enterprise ' + this.selectedEnterprise.name + ' already exists.', 'Error')
      : this.createNewEnterprise();
  }

  createNewEnterprise() {
    this.router.navigate([`/customer-profile-details/${0}`], {
      queryParams: {
        new: 'true',
        enterpriseId: this.selectedEnterprise.enterpriseID,
        name: this.selectedEnterprise.name,
        account: this.selectedEnterprise.accountNumber
      }
    });
  }
}
