const { useState, useEffect, useMemo, useCallback } = React;

/* ---------------------------------------------------------------
   Data: golf courses across the island of Ireland
   Compiled from public course directories. Not exhaustive — the
   community can flag anything missing or out of date in a review.
---------------------------------------------------------------- */
const NI_COURSES = [
  { id: "allen-park", name: "Allen Park (Antrim)", town: "Antrim", county: "Antrim", type: "Parkland", par: 72, yards: 6683 },
  { id: "ardglass", name: "Ardglass", town: "Ardglass", county: "Down", type: "Links", par: 70, yards: 6065 },
  { id: "ardminnan", name: "Ardminnan", town: "Portaferry", county: "Down", type: "Parkland", par: 68, yards: 6053 },
  { id: "ashfield", name: "Ashfield", town: "Cullyhanna", county: "Armagh", type: "Parkland", par: 69, yards: 5606 },
  { id: "ballycastle", name: "Ballycastle", town: "Ballycastle", county: "Antrim", type: "Links/Parkland", par: 71, yards: 5927 },
  { id: "ballyclare", name: "Ballyclare", town: "Ballyclare", county: "Antrim", type: "Parkland", par: 70, yards: 5489 },
  { id: "balmoral", name: "Balmoral", town: "Belfast", county: "Antrim", type: "Parkland", par: 69, yards: 6276 },
  { id: "banbridge", name: "Banbridge", town: "Banbridge", county: "Down", type: "Parkland", par: 69, yards: 5522 },
  { id: "bangor", name: "Bangor", town: "Bangor", county: "Down", type: "Parkland", par: 71, yards: 6410 },
  { id: "belvoir-park", name: "Belvoir Park", town: "Belfast", county: "Down", type: "Parkland", par: 71, yards: 7082 },
  { id: "benone", name: "Benone", town: "Limavady", county: "Londonderry", type: "Par 3", par: 27, yards: 1458 },
  { id: "blackwood", name: "Blackwood", town: "Bangor", county: "Down", type: "Parkland", par: 71, yards: 6392 },
  { id: "bright-castle", name: "Bright Castle", town: "Downpatrick", county: "Down", type: "Parkland", par: 73, yards: 7110 },
  { id: "brown-trout", name: "Brown Trout", town: "Aghadowey", county: "Londonderry", type: "Parkland", par: 70, yards: 5488 },
  { id: "bushfoot", name: "Bushfoot", town: "Portballintrae", county: "Antrim", type: "Links", par: 70, yards: 6075 },
  { id: "cairndhu", name: "Cairndhu", town: "Larne", county: "Antrim", type: "Parkland", par: 70, yards: 6138 },
  { id: "carnalea", name: "Carnalea", town: "Bangor", county: "Down", type: "Meadowland", par: 69, yards: 5574 },
  { id: "carrickfergus", name: "Carrickfergus", town: "Carrickfergus", county: "Antrim", type: "Parkland", par: 68, yards: 6311 },
  { id: "castle-hume", name: "Castle Hume", town: "Enniskillen", county: "Fermanagh", type: "Parkland", par: 72, yards: 6490 },
  { id: "castlerock", name: "Castlerock (Mussenden)", town: "Castlerock", county: "Londonderry", type: "Links", par: 73, yards: 6747 },
  { id: "castlereagh-hills", name: "Castlereagh Hills", town: "Belfast", county: "Down", type: "Moorland", par: 68, yards: 5405 },
  { id: "city-of-derry", name: "City of Derry", town: "Derry", county: "Londonderry", type: "Parkland", par: 71, yards: 6427 },
  { id: "cliftonville", name: "Cliftonville", town: "Belfast", county: "Antrim", type: "Parkland", par: 70, yards: 6232 },
  { id: "clandeboye", name: "Clandeboye (Ava)", town: "Bangor", county: "Down", type: "Parkland/Moorland", par: 71, yards: 5755 },
  { id: "cloverhill", name: "Cloverhill", town: "Kingsmills", county: "Armagh", type: "Parkland", par: 70, yards: 6090 },
  { id: "crossgar", name: "Crossgar", town: "Crossgar", county: "Down", type: "Parkland", par: 64, yards: 4538 },
  { id: "cushendall", name: "Cushendall", town: "Cushendall", county: "Antrim", type: "Parkland", par: 64, yards: 4797 },
  { id: "donaghadee", name: "Donaghadee", town: "Donaghadee", county: "Down", type: "Links/Parkland", par: 71, yards: 6094 },
  { id: "downpatrick", name: "Downpatrick", town: "Downpatrick", county: "Down", type: "Parkland", par: 70, yards: 6120 },
  { id: "dungannon", name: "Dungannon", town: "Dungannon", county: "Tyrone", type: "Parkland", par: 72, yards: 6066 },
  { id: "dunmurry", name: "Dunmurry", town: "Dunmurry", county: "Antrim", type: "Parkland", par: 69, yards: 6413 },
  { id: "edenmore", name: "Edenmore", town: "Lisburn", county: "Antrim", type: "Parkland", par: 71, yards: 6244 },
  { id: "fintona", name: "Fintona", town: "Fintona", county: "Tyrone", type: "Parkland", par: 72, yards: 6307 },
  { id: "fortwilliam", name: "Fortwilliam", town: "Belfast", county: "Antrim", type: "Parkland", par: 70, yards: 5973 },
  { id: "foyle-international", name: "Foyle International", town: "Derry", county: "Londonderry", type: "Parkland", par: 71, yards: 6643 },
  { id: "galgorm-castle", name: "Galgorm Castle", town: "Ballymena", county: "Antrim", type: "Parkland", par: 72, yards: 6736 },
  { id: "gracehill", name: "Gracehill", town: "Ballymoney", county: "Antrim", type: "Parkland", par: 72, yards: 6574 },
  { id: "greenacres", name: "Greenacres", town: "Newtownabbey", county: "Antrim", type: "Parkland", par: 70, yards: 6031 },
  { id: "greenisland", name: "Greenisland", town: "Greenisland", county: "Antrim", type: "Parkland", par: 72, yards: 6153 },
  { id: "helens-bay", name: "Helen's Bay", town: "Bangor", county: "Down", type: "Parkland", par: 68, yards: 5647 },
  { id: "hilton-templepatrick", name: "Hilton Templepatrick", town: "Templepatrick", county: "Antrim", type: "Parkland", par: 71, yards: 7077 },
  { id: "holywood", name: "Holywood", town: "Holywood", county: "Down", type: "Parkland", par: 69, yards: 5996 },
  { id: "kilkeel", name: "Kilkeel", town: "Kilkeel", county: "Down", type: "Parkland", par: 72, yards: 6615 },
  { id: "killymoon", name: "Killymoon", town: "Cookstown", county: "Tyrone", type: "Parkland", par: 70, yards: 6202 },
  { id: "kilrea", name: "Kilrea", town: "Kilrea", county: "Londonderry", type: "Parkland", par: 62, yards: 4514 },
  { id: "kirkistown-castle", name: "Kirkistown Castle", town: "Cloughey", county: "Down", type: "Links", par: 69, yards: 6167 },
  { id: "knock", name: "Knock", town: "Belfast", county: "Down", type: "Parkland", par: 70, yards: 6402 },
  { id: "lambeg", name: "Lambeg (Aberdelghy)", town: "Lambeg", county: "Antrim", type: "Parkland", par: 66, yards: 4528 },
  { id: "larne", name: "Larne", town: "Islandmagee", county: "Antrim", type: "Links", par: 70, yards: 6288 },
  { id: "lisburn", name: "Lisburn", town: "Lisburn", county: "Antrim", type: "Parkland", par: 72, yards: 6647 },
  { id: "lough-erne", name: "Lough Erne (Faldo Course)", town: "Enniskillen", county: "Fermanagh", type: "Parkland", par: 72, yards: 7167 },
  { id: "lurgan", name: "Lurgan", town: "Lurgan", county: "Armagh", type: "Parkland", par: 70, yards: 6290 },
  { id: "mahee-island", name: "Mahee Island", town: "Comber", county: "Down", type: "Parkland", par: 71, yards: 5822 },
  { id: "malone", name: "Malone", town: "Belfast", county: "Antrim", type: "Parkland", par: 72, yards: 6599 },
  { id: "massereene", name: "Massereene", town: "Antrim", county: "Antrim", type: "Parkland", par: 72, yards: 6604 },
  { id: "moyola-park", name: "Moyola Park", town: "Castledawson", county: "Londonderry", type: "Parkland", par: 71, yards: 6519 },
  { id: "newtownstewart", name: "Newtownstewart", town: "Newtownstewart", county: "Tyrone", type: "Parkland", par: 70, yards: 5844 },
  { id: "omagh", name: "Omagh", town: "Omagh", county: "Tyrone", type: "Parkland", par: 71, yards: 6217 },
  { id: "ormeau", name: "Ormeau", town: "Belfast", county: "Down", type: "Parkland", par: 68, yards: 5566 },
  { id: "portadown", name: "Portadown", town: "Portadown", county: "Armagh", type: "Parkland", par: 70, yards: 6118 },
  { id: "portstewart-strand", name: "Portstewart (Strand Course)", town: "Portstewart", county: "Londonderry", type: "Links", par: 72, yards: 6779 },
  { id: "portstewart-old", name: "Portstewart (Old Course)", town: "Portstewart", county: "Londonderry", type: "Links", par: 64, yards: 4783 },
  { id: "portstewart-riverside", name: "Portstewart (Riverside Course)", town: "Portstewart", county: "Londonderry", type: "Links", par: 70, yards: 6304 },
  { id: "rathmore", name: "Rathmore", town: "Newcastle", county: "Down", type: "Parkland", par: 72, yards: 6373 },
  { id: "roe-park", name: "Roe Park Resort", town: "Limavady", county: "Londonderry", type: "Parkland", par: 70, yards: 6227 },
  { id: "royal-belfast", name: "Royal Belfast", town: "Craigavad", county: "Down", type: "Parkland", par: 70, yards: 6306 },
  { id: "royal-county-down-champ", name: "Royal County Down (Championship)", town: "Newcastle", county: "Down", type: "Links", par: 71, yards: 7186 },
  { id: "royal-county-down-annesley", name: "Royal County Down (Annesley)", town: "Newcastle", county: "Down", type: "Links", par: 66, yards: 4681 },
  { id: "royal-portrush-dunluce", name: "Royal Portrush (Dunluce Links)", town: "Portrush", county: "Antrim", type: "Links", par: 72, yards: 7381 },
  { id: "royal-portrush-valley", name: "Royal Portrush (Valley Links)", town: "Portrush", county: "Antrim", type: "Links", par: 70, yards: 6304 },
  { id: "scrabo", name: "Scrabo", town: "Newtownards", county: "Down", type: "Parkland", par: 71, yards: 6260 },
  { id: "shandon-park", name: "Shandon Park", town: "Belfast", county: "Down", type: "Parkland", par: 70, yards: 6282 },
  { id: "silverwood", name: "Silverwood", town: "Lurgan", county: "Armagh", type: "Parkland", par: 72, yards: 6468 },
  { id: "spa", name: "Spa", town: "Ballynahinch", county: "Down", type: "Parkland", par: 72, yards: 6568 },
  { id: "strabane", name: "Strabane", town: "Strabane", county: "Tyrone", type: "Parkland", par: 69, yards: 6135 },
  { id: "tandragee", name: "Tandragee", town: "Tandragee", county: "Armagh", type: "Parkland", par: 71, yards: 6288 },
  { id: "temple", name: "Temple", town: "Boardmills", county: "Down", type: "Parkland", par: 68, yards: 5388 },
  { id: "traad-ponds", name: "Traad Ponds", town: "Randalstown", county: "Antrim", type: "Parkland", par: 70, yards: 5700 },
  { id: "warrenpoint", name: "Warrenpoint", town: "Warrenpoint", county: "Down", type: "Parkland", par: 71, yards: 6173 },
  { id: "whitehead", name: "Whitehead", town: "Whitehead", county: "Antrim", type: "Parkland", par: 70, yards: 5952 },
].map((c) => ({ ...c, country: "Northern Ireland" }));

const ROI_COURSES = [
  { id: "carlow", name: "Carlow (Deerpark)", town: "Carlow", county: "Carlow", type: "Parkland", par: 71, yards: 6440 },
  { id: "mount-wolseley", name: "Mount Wolseley", town: "Tullow", county: "Carlow", type: "Parkland", par: 72, yards: 6700 },
  { id: "borris", name: "Borris", town: "Borris", county: "Carlow", type: "Parkland", par: 70, yards: 6100 },
  { id: "county-cavan", name: "County Cavan", town: "Cavan", county: "Cavan", type: "Parkland", par: 71, yards: 6300 },
  { id: "slieve-russell", name: "Slieve Russell", town: "Ballyconnell", county: "Cavan", type: "Parkland", par: 72, yards: 7080 },
  { id: "lahinch-old", name: "Lahinch (Old Course)", town: "Lahinch", county: "Clare", type: "Links", par: 72, yards: 6950 },
  { id: "lahinch-castle", name: "Lahinch (Castle Course)", town: "Lahinch", county: "Clare", type: "Links", par: 65, yards: 5000 },
  { id: "doonbeg", name: "Trump International Doonbeg", town: "Doonbeg", county: "Clare", type: "Links", par: 72, yards: 6900 },
  { id: "dromoland-castle", name: "Dromoland Castle", town: "Newmarket-on-Fergus", county: "Clare", type: "Parkland", par: 71, yards: 6800 },
  { id: "east-clare", name: "East Clare", town: "Bodyke", county: "Clare", type: "Parkland", par: 71, yards: 6300 },
  { id: "cork-golf-club", name: "Cork Golf Club (Little Island)", town: "Little Island", county: "Cork", type: "Parkland", par: 72, yards: 6700 },
  { id: "fota-island", name: "Fota Island", town: "Carrigtwohill", county: "Cork", type: "Parkland", par: 72, yards: 7100 },
  { id: "old-head", name: "Old Head Golf Links", town: "Kinsale", county: "Cork", type: "Links", par: 72, yards: 7200 },
  { id: "douglas", name: "Douglas", town: "Douglas", county: "Cork", type: "Parkland", par: 71, yards: 6000 },
  { id: "monkstown", name: "Monkstown", town: "Monkstown", county: "Cork", type: "Parkland", par: 70, yards: 5900 },
  { id: "muskerry", name: "Muskerry", town: "Blarney", county: "Cork", type: "Parkland", par: 71, yards: 6200 },
  { id: "youghal", name: "Youghal", town: "Youghal", county: "Cork", type: "Parkland/Links", par: 72, yards: 6200 },
  { id: "bandon", name: "Bandon", town: "Bandon", county: "Cork", type: "Parkland", par: 71, yards: 6100 },
  { id: "ballyliffin-old", name: "Ballyliffin (Old Links)", town: "Ballyliffin", county: "Donegal", type: "Links", par: 71, yards: 6800 },
  { id: "ballyliffin-glashedy", name: "Ballyliffin (Glashedy Links)", town: "Ballyliffin", county: "Donegal", type: "Links", par: 72, yards: 7100 },
  { id: "donegal-murvagh", name: "Donegal Golf Club (Murvagh)", town: "Laghey", county: "Donegal", type: "Links", par: 73, yards: 7200 },
  { id: "narin-portnoo", name: "Narin & Portnoo", town: "Portnoo", county: "Donegal", type: "Links", par: 69, yards: 6200 },
  { id: "rosapenna", name: "Rosapenna", town: "Downings", county: "Donegal", type: "Links", par: 71, yards: 6900 },
  { id: "letterkenny", name: "Letterkenny", town: "Letterkenny", county: "Donegal", type: "Parkland", par: 70, yards: 6200 },
  { id: "dunfanaghy", name: "Dunfanaghy", town: "Dunfanaghy", county: "Donegal", type: "Links", par: 68, yards: 5600 },
  { id: "portmarnock", name: "Portmarnock Golf Club", town: "Portmarnock", county: "Dublin", type: "Links", par: 71, yards: 7400 },
  { id: "royal-dublin", name: "The Royal Dublin Golf Club", town: "Dollymount", county: "Dublin", type: "Links", par: 72, yards: 7300 },
  { id: "the-island", name: "The Island Golf Club", town: "Donabate", county: "Dublin", type: "Links", par: 71, yards: 6700 },
  { id: "st-annes", name: "St Anne's", town: "Dollymount", county: "Dublin", type: "Links", par: 70, yards: 6100 },
  { id: "portmarnock-links", name: "Portmarnock Links (Jameson Links)", town: "Portmarnock", county: "Dublin", type: "Links", par: 71, yards: 6800 },
  { id: "elm-park", name: "Elm Park", town: "Dublin", county: "Dublin", type: "Parkland", par: 69, yards: 5900 },
  { id: "hermitage", name: "Hermitage", town: "Lucan", county: "Dublin", type: "Parkland", par: 71, yards: 6400 },
  { id: "grange", name: "The Grange", town: "Rathfarnham", county: "Dublin", type: "Parkland", par: 71, yards: 6200 },
  { id: "skerries", name: "Skerries", town: "Skerries", county: "Dublin", type: "Parkland", par: 70, yards: 6100 },
  { id: "malahide", name: "Malahide", town: "Malahide", county: "Dublin", type: "Parkland", par: 70, yards: 6100 },
  { id: "luttrellstown", name: "Luttrellstown Castle", town: "Clonsilla", county: "Dublin", type: "Parkland", par: 71, yards: 6600 },
  { id: "galway-salthill", name: "Galway Golf Club (Salthill)", town: "Salthill", county: "Galway", type: "Links/Parkland", par: 70, yards: 6100 },
  { id: "connemara", name: "Connemara (Ballyconneely)", town: "Ballyconneely", county: "Galway", type: "Links", par: 72, yards: 7100 },
  { id: "galway-bay", name: "Galway Bay", town: "Oranmore", county: "Galway", type: "Parkland", par: 72, yards: 6700 },
  { id: "athenry", name: "Athenry", town: "Athenry", county: "Galway", type: "Parkland", par: 71, yards: 6200 },
  { id: "tuam", name: "Tuam", town: "Tuam", county: "Galway", type: "Parkland", par: 70, yards: 6100 },
  { id: "oughterard", name: "Oughterard", town: "Oughterard", county: "Galway", type: "Parkland", par: 71, yards: 6200 },
  { id: "ballybunion-old", name: "Ballybunion (Old Course)", town: "Ballybunion", county: "Kerry", type: "Links", par: 71, yards: 6800 },
  { id: "ballybunion-cashen", name: "Ballybunion (Cashen Course)", town: "Ballybunion", county: "Kerry", type: "Links", par: 72, yards: 6800 },
  { id: "waterville", name: "Waterville Golf Links", town: "Waterville", county: "Kerry", type: "Links", par: 72, yards: 7300 },
  { id: "tralee", name: "Tralee Golf Club", town: "Tralee", county: "Kerry", type: "Links", par: 71, yards: 6900 },
  { id: "dooks", name: "Dooks", town: "Glenbeigh", county: "Kerry", type: "Links", par: 70, yards: 6100 },
  { id: "killarney-killeen", name: "Killarney (Killeen Course)", town: "Killarney", county: "Kerry", type: "Parkland", par: 72, yards: 7000 },
  { id: "killarney-mahonys", name: "Killarney (Mahony's Point)", town: "Killarney", county: "Kerry", type: "Parkland", par: 71, yards: 6700 },
  { id: "dingle", name: "Dingle (Ceann Sibeal)", town: "Ballyferriter", county: "Kerry", type: "Links", par: 72, yards: 6700 },
  { id: "beaufort", name: "Beaufort", town: "Killarney", county: "Kerry", type: "Parkland", par: 72, yards: 6700 },
  { id: "k-club-palmer", name: "The K Club (Palmer Course)", town: "Straffan", county: "Kildare", type: "Parkland", par: 72, yards: 7300 },
  { id: "carton-house-o-meara", name: "Carton House (O'Meara Course)", town: "Maynooth", county: "Kildare", type: "Parkland", par: 72, yards: 7300 },
  { id: "curragh", name: "The Curragh", town: "Curragh", county: "Kildare", type: "Parkland", par: 71, yards: 6500 },
  { id: "naas", name: "Naas", town: "Naas", county: "Kildare", type: "Parkland", par: 71, yards: 6200 },
  { id: "knockanally", name: "Knockanally", town: "Donadea", county: "Kildare", type: "Parkland", par: 71, yards: 6400 },
  { id: "mount-juliet", name: "Mount Juliet", town: "Thomastown", county: "Kilkenny", type: "Parkland", par: 72, yards: 7300 },
  { id: "kilkenny-gc", name: "Kilkenny Golf Club", town: "Kilkenny", county: "Kilkenny", type: "Parkland", par: 70, yards: 6300 },
  { id: "callan", name: "Callan", town: "Callan", county: "Kilkenny", type: "Parkland", par: 70, yards: 6100 },
  { id: "the-heath", name: "The Heath", town: "Portlaoise", county: "Laois", type: "Parkland", par: 73, yards: 6500 },
  { id: "portarlington", name: "Portarlington", town: "Portarlington", county: "Laois", type: "Parkland", par: 70, yards: 6200 },
  { id: "carrick-on-shannon", name: "Carrick-on-Shannon", town: "Carrick-on-Shannon", county: "Leitrim", type: "Parkland", par: 70, yards: 6100 },
  { id: "adare-manor", name: "Adare Manor", town: "Adare", county: "Limerick", type: "Parkland", par: 72, yards: 7500 },
  { id: "limerick-gc", name: "Limerick Golf Club", town: "Ballyclough", county: "Limerick", type: "Parkland", par: 70, yards: 6300 },
  { id: "castletroy", name: "Castletroy", town: "Limerick", county: "Limerick", type: "Parkland", par: 71, yards: 6400 },
  { id: "county-longford", name: "County Longford", town: "Longford", county: "Longford", type: "Parkland", par: 71, yards: 6300 },
  { id: "county-louth", name: "County Louth (Baltray)", town: "Termonfeckin", county: "Louth", type: "Links", par: 72, yards: 7100 },
  { id: "seapoint", name: "Seapoint", town: "Termonfeckin", county: "Louth", type: "Links", par: 71, yards: 6700 },
  { id: "greenore", name: "Greenore", town: "Greenore", county: "Louth", type: "Links/Parkland", par: 71, yards: 6100 },
  { id: "ardee", name: "Ardee", town: "Ardee", county: "Louth", type: "Parkland", par: 70, yards: 6200 },
  { id: "carne", name: "Carne Golf Links", town: "Belmullet", county: "Mayo", type: "Links", par: 72, yards: 7100 },
  { id: "westport", name: "Westport", town: "Westport", county: "Mayo", type: "Parkland", par: 73, yards: 7000 },
  { id: "enniscrone", name: "Enniscrone", town: "Enniscrone", county: "Mayo", type: "Links", par: 72, yards: 7000 },
  { id: "ballina", name: "Ballina", town: "Ballina", county: "Mayo", type: "Parkland", par: 71, yards: 6200 },
  { id: "royal-tara", name: "Royal Tara", town: "Navan", county: "Meath", type: "Parkland", par: 72, yards: 6500 },
  { id: "black-bush", name: "Black Bush", town: "Dunshaughlin", county: "Meath", type: "Parkland", par: 73, yards: 6900 },
  { id: "headfort", name: "Headfort", town: "Kells", county: "Meath", type: "Parkland", par: 71, yards: 6600 },
  { id: "laytown-bettystown", name: "Royal County Meath (Laytown & Bettystown)", town: "Bettystown", county: "Meath", type: "Links", par: 71, yards: 6200 },
  { id: "rossmore", name: "Rossmore", town: "Monaghan", county: "Monaghan", type: "Parkland", par: 71, yards: 6300 },
  { id: "nuremore", name: "Nuremore", town: "Carrickmacross", county: "Monaghan", type: "Parkland", par: 71, yards: 6300 },
  { id: "tullamore", name: "Tullamore", town: "Tullamore", county: "Offaly", type: "Parkland", par: 71, yards: 6400 },
  { id: "esker-hills", name: "Esker Hills", town: "Tullamore", county: "Offaly", type: "Parkland", par: 72, yards: 6800 },
  { id: "roscommon-gc", name: "Roscommon Golf Club", town: "Roscommon", county: "Roscommon", type: "Parkland", par: 71, yards: 6100 },
  { id: "county-sligo", name: "County Sligo (Rosses Point)", town: "Rosses Point", county: "Sligo", type: "Links", par: 71, yards: 7000 },
  { id: "strandhill", name: "Strandhill", town: "Strandhill", county: "Sligo", type: "Links", par: 69, yards: 6200 },
  { id: "thurles", name: "Thurles", town: "Thurles", county: "Tipperary", type: "Parkland", par: 71, yards: 6400 },
  { id: "clonmel", name: "Clonmel", town: "Clonmel", county: "Tipperary", type: "Parkland", par: 70, yards: 6100 },
  { id: "nenagh", name: "Nenagh", town: "Nenagh", county: "Tipperary", type: "Parkland", par: 71, yards: 6300 },
  { id: "waterford-gc", name: "Waterford Golf Club", town: "Waterford", county: "Waterford", type: "Parkland", par: 71, yards: 6400 },
  { id: "west-waterford", name: "West Waterford", town: "Dungarvan", county: "Waterford", type: "Parkland", par: 72, yards: 6700 },
  { id: "tramore", name: "Tramore", town: "Tramore", county: "Waterford", type: "Parkland", par: 72, yards: 6600 },
  { id: "faithlegg", name: "Faithlegg", town: "Faithlegg", county: "Waterford", type: "Parkland", par: 72, yards: 6700 },
  { id: "mullingar", name: "Mullingar", town: "Mullingar", county: "Westmeath", type: "Parkland", par: 71, yards: 6400 },
  { id: "glasson", name: "Glasson", town: "Athlone", county: "Westmeath", type: "Parkland", par: 72, yards: 6900 },
  { id: "rosslare", name: "Rosslare", town: "Rosslare", county: "Wexford", type: "Links", par: 72, yards: 6600 },
  { id: "st-helens-bay", name: "St Helen's Bay", town: "Rosslare", county: "Wexford", type: "Links/Parkland", par: 71, yards: 6500 },
  { id: "wexford-gc", name: "Wexford Golf Club", town: "Wexford", county: "Wexford", type: "Parkland", par: 70, yards: 6100 },
  { id: "new-ross", name: "New Ross", town: "New Ross", county: "Wexford", type: "Parkland", par: 71, yards: 6200 },
  { id: "druids-glen", name: "Druids Glen", town: "Newtownmountkennedy", county: "Wicklow", type: "Parkland", par: 71, yards: 7100 },
  { id: "powerscourt", name: "Powerscourt", town: "Enniskerry", county: "Wicklow", type: "Parkland", par: 72, yards: 7200 },
  { id: "european-club", name: "The European Club", town: "Brittas Bay", county: "Wicklow", type: "Links", par: 71, yards: 7200 },
  { id: "wicklow-gc", name: "Wicklow Golf Club", town: "Wicklow", county: "Wicklow", type: "Parkland", par: 70, yards: 6100 },
  { id: "blainroe", name: "Blainroe", town: "Wicklow", county: "Wicklow", type: "Parkland", par: 71, yards: 6200 },
  { id: "rathsallagh", name: "Rathsallagh", town: "Dunlavin", county: "Wicklow", type: "Parkland", par: 72, yards: 6900 },
  { id: "woodenbridge", name: "Woodenbridge", town: "Arklow", county: "Wicklow", type: "Parkland", par: 72, yards: 6400 },
].map((c) => ({ ...c, county: c.county, country: "Republic of Ireland" }));

const COURSES = [...NI_COURSES, ...ROI_COURSES];

const NI_COUNTY_ORDER = ["Antrim", "Armagh", "Down", "Fermanagh", "Londonderry", "Tyrone"];
const ROI_COUNTY_ORDER = [
  "Carlow", "Cavan", "Clare", "Cork", "Donegal", "Dublin", "Galway", "Kerry", "Kildare",
  "Kilkenny", "Laois", "Leitrim", "Limerick", "Longford", "Louth", "Mayo", "Meath",
  "Monaghan", "Offaly", "Roscommon", "Sligo", "Tipperary", "Waterford", "Westmeath",
  "Wexford", "Wicklow",
];
const COUNTY_TO_COUNTRY = {};
NI_COUNTY_ORDER.forEach((c) => (COUNTY_TO_COUNTRY[c] = "Northern Ireland"));
ROI_COUNTY_ORDER.forEach((c) => (COUNTY_TO_COUNTRY[c] = "Republic of Ireland"));
const COUNTRY_ORDER = ["Northern Ireland", "Republic of Ireland"];

const STORAGE_KEY = "course-reviews";
const REVIEW_PHOTOS_KEY = "review-photos"; // shared: { [reviewId]: dataUrl } — kept separate from review text
const ACCOUNTS_KEY = "accounts"; // shared database: { [usernameLower]: { name, salt, hash } }
const AUTH_KEY = "auth-session"; // personal, per device: { username } — keeps you logged in
const FRIENDS_KEY = "my-friends";
const AVATARS_KEY = "profile-avatars";
const AVATAR_SIZE = 160; // px, stored image is resized/cropped to this square
const REVIEW_PHOTO_MAX_DIMENSION = 720; // px, longest edge of an uploaded review photo

// Retries a storage operation a few times before giving up, since a single
// network hiccup shouldn't mean someone's data never makes it into the
// shared database.
async function withRetries(fn, attempts = 4, delayMs = 350) {
  let lastErr;
  for (let i = 0; i < attempts; i++) {
    try {
      const result = await fn();
      if (result) return result;
      lastErr = new Error("Storage returned no result");
    } catch (e) {
      lastErr = e;
    }
    if (i < attempts - 1) {
      await new Promise((r) => setTimeout(r, delayMs * (i + 1)));
    }
  }
  throw lastErr;
}

// Hashes a password with a random per-account salt using SHA-256, so
// passwords are never stored in plain text. This is a lightweight identity
// check for a friendly community app, not bank-grade security.
async function sha256Hex(text) {
  const data = new TextEncoder().encode(text);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(digest)).map((b) => b.toString(16).padStart(2, "0")).join("");
}

function randomSaltHex(len = 16) {
  const bytes = crypto.getRandomValues(new Uint8Array(len));
  return Array.from(bytes).map((b) => b.toString(16).padStart(2, "0")).join("");
}

/* ---------------------------------------------------------------
   Small pieces
---------------------------------------------------------------- */

const AVATAR_PALETTE = ["#2F5233", "#3C6E71", "#D9A404", "#9C3D2E", "#4C5A4D"];

function initialsFor(name) {
  if (!name) return "?";
  const parts = name.trim().split(/\s+/);
  return parts.slice(0, 2).map((p) => p[0]?.toUpperCase() || "").join("") || "?";
}

function colorFor(name) {
  if (!name) return AVATAR_PALETTE[0];
  const hash = name.split("").reduce((a, c) => a + c.charCodeAt(0), 0);
  return AVATAR_PALETTE[hash % AVATAR_PALETTE.length];
}

function Avatar({ name, src, size = 40 }) {
  if (src) {
    return (
      <img
        src={src}
        alt={name}
        style={{
          width: size,
          height: size,
          borderRadius: "50%",
          objectFit: "cover",
          border: "1.5px solid #2F5233",
          flexShrink: 0,
        }}
      />
    );
  }
  return (
    <span
      className="mono"
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        background: colorFor(name),
        color: "#EDEFE4",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: size * 0.36,
        fontWeight: 600,
        flexShrink: 0,
      }}
    >
      {initialsFor(name)}
    </span>
  );
}

// Reads an uploaded image file, crops it to a centered square, and returns a
// small base64 JPEG data URL suitable for storing as text.
function fileToAvatarDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error("Couldn't read that file"));
    reader.onload = (e) => {
      const img = new Image();
      img.onerror = () => reject(new Error("Couldn't read that image"));
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = AVATAR_SIZE;
        canvas.height = AVATAR_SIZE;
        const ctx = canvas.getContext("2d");
        const scale = Math.max(AVATAR_SIZE / img.width, AVATAR_SIZE / img.height);
        const w = img.width * scale;
        const h = img.height * scale;
        ctx.drawImage(img, (AVATAR_SIZE - w) / 2, (AVATAR_SIZE - h) / 2, w, h);
        resolve(canvas.toDataURL("image/jpeg", 0.85));
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  });
}

// Reads an uploaded image file and returns a compressed base64 JPEG data URL,
// scaled down so its longest edge fits within maxDimension. Keeps the
// original aspect ratio (unlike the square avatar crop above).
function fileToPhotoDataUrl(file, maxDimension = REVIEW_PHOTO_MAX_DIMENSION) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error("Couldn't read that file"));
    reader.onload = (e) => {
      const img = new Image();
      img.onerror = () => reject(new Error("Couldn't read that image"));
      img.onload = () => {
        const scale = Math.min(1, maxDimension / Math.max(img.width, img.height));
        const w = Math.round(img.width * scale);
        const h = Math.round(img.height * scale);
        const canvas = document.createElement("canvas");
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, w, h);
        resolve(canvas.toDataURL("image/jpeg", 0.75));
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  });
}

function BallRating({ value, size = 14 }) {
  // signature rating device: 5 dimpled "balls" fill with gorse yellow
  const balls = [1, 2, 3, 4, 5];
  return (
    <span style={{ display: "inline-flex", gap: 3, verticalAlign: "middle" }}>
      {balls.map((b) => {
        const fill = Math.max(0, Math.min(1, value - (b - 1)));
        return (
          <span
            key={b}
            style={{
              position: "relative",
              width: size,
              height: size,
              borderRadius: "50%",
              border: "1.5px solid #2F5233",
              overflow: "hidden",
              flexShrink: 0,
              background: "#EDEFE4",
            }}
          >
            <span
              style={{
                position: "absolute",
                left: 0,
                bottom: 0,
                width: "100%",
                height: `${fill * 100}%`,
                background: "#D9A404",
              }}
            />
          </span>
        );
      })}
    </span>
  );
}

function StarPicker({ value, onChange }) {
  return (
    <div style={{ display: "flex", gap: 6 }}>
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          type="button"
          onClick={() => onChange(n)}
          aria-label={`${n} star${n > 1 ? "s" : ""}`}
          style={{
            width: 34,
            height: 34,
            borderRadius: "50%",
            border: "1.5px solid #2F5233",
            background: n <= value ? "#D9A404" : "#EDEFE4",
            color: "#182619",
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 12,
            cursor: "pointer",
            transition: "background 120ms ease",
          }}
        >
          {n}
        </button>
      ))}
    </div>
  );
}

/* ---------------------------------------------------------------
   Main app
---------------------------------------------------------------- */

function App() {
  const [reviews, setReviews] = useState({}); // { courseId: [ {id,name,rating,comment,date} ] }
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(null);

  const [query, setQuery] = useState("");
  const [country, setCountry] = useState("All");
  const [county, setCounty] = useState("All");
  const [sort, setSort] = useState("name"); // name | rating
  const [expanded, setExpanded] = useState(null);
  const [view, setView] = useState("courses"); // courses | reviews | friends

  // your identity + friends (stored privately, per device)
  const [myName, setMyName] = useState("");
  const [friends, setFriends] = useState([]);
  const [friendSearch, setFriendSearch] = useState("");
  const [openFriend, setOpenFriend] = useState(null);
  const [accounts, setAccounts] = useState({}); // shared database: { [usernameLower]: { name, salt, hash } }

  // log in / sign up form
  const [authMode, setAuthMode] = useState("login"); // login | signup
  const [usernameDraft, setUsernameDraft] = useState("");
  const [passwordDraft, setPasswordDraft] = useState("");
  const [password2Draft, setPassword2Draft] = useState("");
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState(null);

  // profile pictures (shared, keyed by name so friends can see them)
  const [avatars, setAvatars] = useState({});
  const [avatarSaving, setAvatarSaving] = useState(false);
  const fileInputRef = React.useRef(null);

  // form state per course
  const [formName, setFormName] = useState("");
  const [formRating, setFormRating] = useState(5);
  const [formComment, setFormComment] = useState("");
  const [saving, setSaving] = useState(false);
  const [formPhoto, setFormPhoto] = useState(null); // staged dataURL for the review being written
  const [photoProcessing, setPhotoProcessing] = useState(false);
  const [reviewPhotos, setReviewPhotos] = useState({}); // { [reviewId]: dataUrl }
  const [lightboxPhoto, setLightboxPhoto] = useState(null);
  const reviewPhotoInputRef = React.useRef(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await window.storage.get(STORAGE_KEY, true);
        if (res && res.value) {
          setReviews(JSON.parse(res.value));
        }
      } catch (e) {
        // key doesn't exist yet — that's fine, start empty
      } finally {
        setLoaded(true);
      }
    })();

    (async () => {
      try {
        const res = await window.storage.get(AVATARS_KEY, true);
        if (res && res.value) setAvatars(JSON.parse(res.value));
      } catch (e) {
        // no avatars saved yet
      }
    })();

    (async () => {
      try {
        const res = await window.storage.get(REVIEW_PHOTOS_KEY, true);
        if (res && res.value) setReviewPhotos(JSON.parse(res.value));
      } catch (e) {
        // no review photos saved yet
      }
    })();

    (async () => {
      try {
        const res = await window.storage.get(ACCOUNTS_KEY, true);
        if (res && res.value) setAccounts(JSON.parse(res.value));
      } catch (e) {
        // no accounts registered yet
      }
    })();

    (async () => {
      try {
        const res = await window.storage.get(AUTH_KEY, false);
        if (res && res.value) {
          const parsed = JSON.parse(res.value);
          if (parsed.username) setMyName(parsed.username);
        }
      } catch (e) {
        // not logged in on this device
      }
      try {
        const res2 = await window.storage.get(FRIENDS_KEY, false);
        if (res2 && res2.value) setFriends(JSON.parse(res2.value));
      } catch (e) {
        // no friends saved yet
      }
    })();
  }, []);

  const handleSignUp = async () => {
    const username = usernameDraft.trim();
    const password = passwordDraft;
    if (!username) {
      setAuthError("Enter a username.");
      return;
    }
    if (password.length < 4) {
      setAuthError("Password needs to be at least 4 characters.");
      return;
    }
    if (password !== password2Draft) {
      setAuthError("Passwords don't match.");
      return;
    }
    const key = username.toLowerCase();
    setAuthLoading(true);
    setAuthError(null);
    try {
      let current = {};
      try {
        const res = await window.storage.get(ACCOUNTS_KEY, true);
        if (res && res.value) current = JSON.parse(res.value);
      } catch (e) {
        // no accounts yet — this'll be the first
      }
      if (current[key]) {
        setAuthError("That username is already taken — try logging in, or pick a different name.");
        setAuthLoading(false);
        return;
      }
      const salt = randomSaltHex();
      const hash = await sha256Hex(salt + ":" + password);
      const next = { ...current, [key]: { name: username, salt, hash } };
      await withRetries(() => window.storage.set(ACCOUNTS_KEY, JSON.stringify(next), true));
      await withRetries(() => window.storage.set(AUTH_KEY, JSON.stringify({ username }), false));
      setAccounts(next);
      setMyName(username);
      setUsernameDraft("");
      setPasswordDraft("");
      setPassword2Draft("");
    } catch (e) {
      setAuthError("Couldn't create your account — please try again.");
    } finally {
      setAuthLoading(false);
    }
  };

  const handleLogIn = async () => {
    const username = usernameDraft.trim();
    const password = passwordDraft;
    if (!username || !password) {
      setAuthError("Enter your username and password.");
      return;
    }
    const key = username.toLowerCase();
    setAuthLoading(true);
    setAuthError(null);
    try {
      let current = accounts;
      try {
        const res = await window.storage.get(ACCOUNTS_KEY, true);
        if (res && res.value) current = JSON.parse(res.value);
      } catch (e) {
        // fall back to whatever's already loaded in state
      }
      const account = current[key];
      if (!account) {
        setAuthError("No account with that username — sign up instead?");
        setAuthLoading(false);
        return;
      }
      const hash = await sha256Hex(account.salt + ":" + password);
      if (hash !== account.hash) {
        setAuthError("Incorrect password.");
        setAuthLoading(false);
        return;
      }
      await withRetries(() => window.storage.set(AUTH_KEY, JSON.stringify({ username: account.name }), false));
      setAccounts(current);
      setMyName(account.name);
      setUsernameDraft("");
      setPasswordDraft("");
    } catch (e) {
      setAuthError("Couldn't log you in — please try again.");
    } finally {
      setAuthLoading(false);
    }
  };

  const handleLogOut = async () => {
    try {
      await window.storage.delete(AUTH_KEY, false);
    } catch (e) {
      // still clear locally even if the delete call fails
    }
    setMyName("");
  };

  const toggleFriend = async (name) => {
    const isFriend = friends.includes(name);
    const next = isFriend ? friends.filter((f) => f !== name) : [...friends, name];
    try {
      await window.storage.set(FRIENDS_KEY, JSON.stringify(next), false);
      setFriends(next);
    } catch (e) {
      setError("Couldn't update your friends list — please try again.");
    }
  };

  const onAvatarSelected = async (e) => {
    const file = e.target.files && e.target.files[0];
    e.target.value = ""; // allow re-selecting the same file later
    if (!file || !myName) return;
    if (!file.type.startsWith("image/")) {
      setError("Please choose an image file for your profile picture.");
      return;
    }
    setAvatarSaving(true);
    setError(null);
    try {
      const dataUrl = await fileToAvatarDataUrl(file);
      const next = { ...avatars, [myName]: dataUrl };
      const result = await window.storage.set(AVATARS_KEY, JSON.stringify(next), true);
      if (!result) throw new Error("Storage write failed");
      setAvatars(next);
    } catch (e) {
      setError("Couldn't save that photo — try a smaller image.");
    } finally {
      setAvatarSaving(false);
    }
  };

  const statsFor = useCallback(
    (id) => {
      const list = reviews[id] || [];
      if (list.length === 0) return { avg: 0, count: 0 };
      const avg = list.reduce((s, r) => s + r.rating, 0) / list.length;
      return { avg, count: list.length };
    },
    [reviews]
  );

  const filtered = useMemo(() => {
    let list = COURSES.filter((c) => {
      const matchesQuery =
        !query.trim() ||
        c.name.toLowerCase().includes(query.toLowerCase()) ||
        c.town.toLowerCase().includes(query.toLowerCase());
      const matchesCountry = country === "All" || c.country === country;
      const matchesCounty = county === "All" || c.county === county;
      return matchesQuery && matchesCountry && matchesCounty;
    });
    if (sort === "rating") {
      list = [...list].sort((a, b) => statsFor(b.id).avg - statsFor(a.id).avg);
    } else {
      list = [...list].sort((a, b) => a.name.localeCompare(b.name));
    }
    return list;
  }, [query, country, county, sort, statsFor]);

  const allReviews = useMemo(() => {
    const flat = [];
    for (const course of COURSES) {
      for (const r of reviews[course.id] || []) {
        flat.push({ ...r, courseId: course.id, courseName: course.name, county: course.county, country: course.country });
      }
    }
    flat.sort((a, b) => (a.id < b.id ? 1 : -1)); // id is time-ordered
    return flat;
  }, [reviews]);

  const reviewerProfiles = useMemo(() => {
    const map = {};
    for (const r of allReviews) {
      if (!map[r.name]) map[r.name] = { name: r.name, reviews: [] };
      map[r.name].reviews.push(r);
    }
    // include every registered account too, even with zero reviews so far
    for (const account of Object.values(accounts)) {
      if (!map[account.name]) map[account.name] = { name: account.name, reviews: [] };
    }
    return Object.values(map)
      .map((p) => ({
        ...p,
        count: p.reviews.length,
        avg: p.reviews.length ? p.reviews.reduce((s, x) => s + x.rating, 0) / p.reviews.length : 0,
      }))
      .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));
  }, [allReviews, accounts]);

  const filteredReviewers = useMemo(() => {
    const others = reviewerProfiles.filter((p) => p.name !== myName);
    if (!friendSearch.trim()) return others;
    return others.filter((p) => p.name.toLowerCase().includes(friendSearch.toLowerCase()));
  }, [reviewerProfiles, friendSearch, myName]);

  const friendProfiles = useMemo(
    () => friends.map((f) => reviewerProfiles.find((p) => p.name === f) || { name: f, reviews: [], count: 0, avg: 0 }),
    [friends, reviewerProfiles]
  );

  const myProfile = useMemo(
    () => reviewerProfiles.find((p) => p.name === myName) || null,
    [reviewerProfiles, myName]
  );

  const leaderboard = useMemo(() => {
    const rated = COURSES.map((c) => ({ course: c, ...statsFor(c.id) })).filter((x) => x.count > 0);
    const qualified = rated.filter((x) => x.count >= 3);
    const pool = qualified.length >= 25 ? qualified : rated;
    return pool
      .sort((a, b) => b.avg - a.avg || b.count - a.count)
      .slice(0, 25);
  }, [statsFor]);

  const grouped = useMemo(() => {
    if (sort === "rating") return { "": { "": filtered } };
    const g = {};
    for (const c of filtered) {
      g[c.country] = g[c.country] || {};
      g[c.country][c.county] = g[c.country][c.county] || [];
      g[c.country][c.county].push(c);
    }
    return g;
  }, [filtered, sort]);

  const sections = useMemo(() => {
    if (sort === "rating") return [{ countryName: "", countyName: "", courses: filtered }];
    const out = [];
    const countryKeys = Object.keys(grouped).sort(
      (a, b) => COUNTRY_ORDER.indexOf(a) - COUNTRY_ORDER.indexOf(b)
    );
    for (const countryName of countryKeys) {
      const countyMap = grouped[countryName];
      const order = countryName === "Northern Ireland" ? NI_COUNTY_ORDER : ROI_COUNTY_ORDER;
      const countyKeys = Object.keys(countyMap).sort((a, b) => order.indexOf(a) - order.indexOf(b));
      for (const countyName of countyKeys) {
        out.push({ countryName, countyName, courses: countyMap[countyName] });
      }
    }
    return out;
  }, [grouped, filtered, sort]);

  const openCourse = (id) => {
    if (expanded === id) {
      setExpanded(null);
    } else {
      setExpanded(id);
      setFormName(myName || "");
      setFormRating(5);
      setFormComment("");
      setFormPhoto(null);
      setError(null);
    }
  };

  const onReviewPhotoSelected = async (e) => {
    const file = e.target.files && e.target.files[0];
    e.target.value = ""; // allow re-selecting the same file later
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setError("Please choose an image file for your photo.");
      return;
    }
    setPhotoProcessing(true);
    setError(null);
    try {
      const dataUrl = await fileToPhotoDataUrl(file);
      setFormPhoto(dataUrl);
    } catch (e) {
      setError("Couldn't read that photo — try a different one.");
    } finally {
      setPhotoProcessing(false);
    }
  };

  const submitReview = async (courseId) => {
    if (!formName.trim() || !formComment.trim()) {
      setError("Add your name and a short comment before posting.");
      return;
    }
    setSaving(true);
    setError(null);
    try {
      const newReview = {
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
        name: formName.trim(),
        rating: formRating,
        comment: formComment.trim(),
        date: new Date().toISOString().slice(0, 10),
      };
      const next = { ...reviews, [courseId]: [...(reviews[courseId] || []), newReview] };
      const result = await window.storage.set(STORAGE_KEY, JSON.stringify(next), true);
      if (!result) throw new Error("Storage write failed");
      setReviews(next);

      // Photo is saved separately so a photo hiccup never risks the review text.
      if (formPhoto) {
        try {
          await withRetries(async () => {
            let existingPhotos = reviewPhotos;
            try {
              const res = await window.storage.get(REVIEW_PHOTOS_KEY, true);
              if (res && res.value) existingPhotos = JSON.parse(res.value);
            } catch (e) {
              // no photos saved yet
            }
            const nextPhotos = { ...existingPhotos, [newReview.id]: formPhoto };
            const photoResult = await window.storage.set(REVIEW_PHOTOS_KEY, JSON.stringify(nextPhotos), true);
            if (photoResult) setReviewPhotos(nextPhotos);
            return photoResult;
          });
        } catch (e) {
          // the review itself is safely posted either way — just note the photo issue
          setError("Your review posted, but the photo couldn't be saved — you can try adding it again.");
        }
      }

      setFormName("");
      setFormRating(5);
      setFormComment("");
      setFormPhoto(null);
    } catch (e) {
      setError("Couldn't save that review — please try again.");
    } finally {
      setSaving(false);
    }
  };

  const countyOrder = ["Antrim", "Armagh", "Down", "Fermanagh", "Londonderry", "Tyrone"];

  return (
    <div style={{ minHeight: "100vh", background: "#EDEFE4", color: "#182619" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,500;12..96,600;12..96,700;12..96,800&family=JetBrains+Mono:wght@400;500;700&family=Inter:wght@400;500;600&display=swap');
        * { box-sizing: border-box; }
        body { margin: 0; }
        .disp { font-family: 'Bricolage Grotesque', sans-serif; letter-spacing: -0.015em; }
        .mono { font-family: 'JetBrains Mono', monospace; letter-spacing: 0; }
        .body-f { font-family: 'Inter', sans-serif; }
        input, select, textarea, button { font-family: inherit; }
        ::placeholder { color: #6b7a6c; }
        .course-card { transition: box-shadow 150ms ease, border-color 150ms ease; }
        .course-card:hover { border-color: #2F5233; }
      `}</style>

      {/* Hero */}
      <header
        style={{
          background: "linear-gradient(180deg, #1B2B22 0%, #2F5233 100%)",
          color: "#EDEFE4",
          padding: "36px 20px 28px",
        }}
      >
        <div style={{ maxWidth: 780, margin: "0 auto" }}>
          <div className="mono" style={{ fontSize: 12, letterSpacing: "0.12em", color: "#D9A404", marginBottom: 8 }}>
            32 COUNTIES · LINKS &amp; PARKLAND
          </div>
          <h1 className="disp" style={{ fontSize: "clamp(28px, 6vw, 42px)", fontWeight: 600, margin: 0, lineHeight: 1.1 }}>
            Ireland Golf Courses
          </h1>
          <p className="body-f" style={{ marginTop: 10, fontSize: 15, color: "#DCE4DA", maxWidth: 520, lineHeight: 1.5 }}>
            {COURSES.length} courses across the island of Ireland, north and south.
            Rate the ones you've played and read what other golfers thought.
          </p>

          <div style={{ marginTop: 20, display: "flex", gap: 6, flexWrap: "wrap" }}>
            <button
              onClick={() => setView("courses")}
              className="mono"
              style={{
                flex: "1 1 45%",
                padding: "9px 6px",
                borderRadius: 8,
                border: "1.5px solid #D9A404",
                background: view === "courses" ? "#D9A404" : "transparent",
                color: view === "courses" ? "#1B2B22" : "#EDEFE4",
                fontSize: 11.5,
                fontWeight: 600,
                cursor: "pointer",
                letterSpacing: "0.03em",
              }}
            >
              COURSES
            </button>
            <button
              onClick={() => setView("leaderboard")}
              className="mono"
              style={{
                flex: "1 1 45%",
                padding: "9px 6px",
                borderRadius: 8,
                border: "1.5px solid #D9A404",
                background: view === "leaderboard" ? "#D9A404" : "transparent",
                color: view === "leaderboard" ? "#1B2B22" : "#EDEFE4",
                fontSize: 11.5,
                fontWeight: 600,
                cursor: "pointer",
                letterSpacing: "0.03em",
              }}
            >
              TOP 25
            </button>
            <button
              onClick={() => setView("reviews")}
              className="mono"
              style={{
                flex: "1 1 45%",
                padding: "9px 6px",
                borderRadius: 8,
                border: "1.5px solid #D9A404",
                background: view === "reviews" ? "#D9A404" : "transparent",
                color: view === "reviews" ? "#1B2B22" : "#EDEFE4",
                fontSize: 11.5,
                fontWeight: 600,
                cursor: "pointer",
                letterSpacing: "0.03em",
              }}
            >
              REVIEWS ({allReviews.length})
            </button>
            <button
              onClick={() => setView("friends")}
              className="mono"
              style={{
                flex: "1 1 45%",
                padding: "9px 6px",
                borderRadius: 8,
                border: "1.5px solid #D9A404",
                background: view === "friends" ? "#D9A404" : "transparent",
                color: view === "friends" ? "#1B2B22" : "#EDEFE4",
                fontSize: 11.5,
                fontWeight: 600,
                cursor: "pointer",
                letterSpacing: "0.03em",
              }}
            >
              FRIENDS ({friends.length})
            </button>
          </div>

          <div style={{ marginTop: 14, display: view === "courses" ? "flex" : "none", flexDirection: "column", gap: 10 }}>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by course or town…"
              className="body-f"
              style={{
                padding: "11px 14px",
                borderRadius: 8,
                border: "1.5px solid #3C6E71",
                background: "#0F1B12",
                color: "#EDEFE4",
                fontSize: 15,
                outline: "none",
              }}
            />
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              <select
                value={country}
                onChange={(e) => {
                  setCountry(e.target.value);
                  setCounty("All");
                }}
                className="mono"
                style={{
                  flex: "1 1 140px",
                  padding: "9px 10px",
                  borderRadius: 8,
                  border: "1.5px solid #3C6E71",
                  background: "#0F1B12",
                  color: "#EDEFE4",
                  fontSize: 13,
                }}
              >
                <option value="All">All of Ireland</option>
                <option value="Northern Ireland">Northern Ireland</option>
                <option value="Republic of Ireland">Republic of Ireland</option>
              </select>
              <select
                value={county}
                onChange={(e) => setCounty(e.target.value)}
                className="mono"
                style={{
                  flex: "1 1 140px",
                  padding: "9px 10px",
                  borderRadius: 8,
                  border: "1.5px solid #3C6E71",
                  background: "#0F1B12",
                  color: "#EDEFE4",
                  fontSize: 13,
                }}
              >
                <option value="All">All counties</option>
                {country !== "Republic of Ireland" && (
                  <optgroup label="Northern Ireland">
                    {NI_COUNTY_ORDER.map((c) => (
                      <option key={c} value={c}>Co. {c}</option>
                    ))}
                  </optgroup>
                )}
                {country !== "Northern Ireland" && (
                  <optgroup label="Republic of Ireland">
                    {ROI_COUNTY_ORDER.map((c) => (
                      <option key={c} value={c}>Co. {c}</option>
                    ))}
                  </optgroup>
                )}
              </select>
            </div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="mono"
                style={{
                  flex: "1 1 140px",
                  padding: "9px 10px",
                  borderRadius: 8,
                  border: "1.5px solid #3C6E71",
                  background: "#0F1B12",
                  color: "#EDEFE4",
                  fontSize: 13,
                }}
              >
                <option value="name">Sort: A–Z</option>
                <option value="rating">Sort: top rated</option>
              </select>
            </div>
          </div>
        </div>
      </header>

      {/* List */}
      <main style={{ maxWidth: 780, margin: "0 auto", padding: "20px 16px 60px" }}>
        {!loaded && (
          <div className="body-f" style={{ textAlign: "center", padding: 40, color: "#3C6E71" }}>
            Loading course ratings…
          </div>
        )}

        {loaded && view === "courses" &&
          sections.map((section, idx) => {
            const showCountryHeader =
              section.countryName && (idx === 0 || sections[idx - 1].countryName !== section.countryName);
            return (
              <React.Fragment key={`${section.countryName}-${section.countyName}`}>
                {showCountryHeader && (
                  <div style={{ margin: idx === 0 ? "4px 0 4px" : "30px 0 4px" }}>
                    <span className="mono" style={{ fontSize: 12, letterSpacing: "0.1em", color: "#D9A404" }}>
                      {section.countryName.toUpperCase()}
                    </span>
                  </div>
                )}
                <section style={{ marginBottom: 24 }}>
                  {section.countyName && (
                    <div style={{ display: "flex", alignItems: "center", gap: 10, margin: "10px 0 10px" }}>
                      <span className="disp" style={{ fontSize: 19, fontWeight: 600, color: "#2F5233" }}>
                        Co. {section.countyName}
                      </span>
                      <span style={{ flex: 1, height: 1, background: "#C9C0A0" }} />
                      <span className="mono" style={{ fontSize: 11, color: "#3C6E71" }}>
                        {section.courses.length} course{section.courses.length !== 1 ? "s" : ""}
                      </span>
                    </div>
                  )}

                  <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    {section.courses.map((course) => {
                      const { avg, count } = statsFor(course.id);
                      const isOpen = expanded === course.id;
                      return (
                        <div
                          key={course.id}
                          className="course-card"
                          style={{
                            border: "1.5px solid #DCD0AE",
                            borderRadius: 10,
                            background: "#F6F4EA",
                            overflow: "hidden",
                          }}
                        >
                          <button
                            onClick={() => openCourse(course.id)}
                            style={{
                              width: "100%",
                              textAlign: "left",
                              padding: "14px 16px",
                              background: "transparent",
                              border: "none",
                              cursor: "pointer",
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                              gap: 12,
                            }}
                          >
                            <div style={{ minWidth: 0 }}>
                              <div className="disp" style={{ fontSize: 17, fontWeight: 600, color: "#182619" }}>
                                {course.name}
                              </div>
                              <div className="body-f" style={{ fontSize: 13, color: "#4C5A4D", marginTop: 1 }}>
                                {course.town}
                                {!section.countyName ? `, Co. ${course.county}` : ""} · {course.type}
                              </div>
                              <div className="mono" style={{ fontSize: 11.5, color: "#3C6E71", marginTop: 5 }}>
                                PAR {course.par} · {course.yards.toLocaleString()} YDS
                              </div>
                            </div>
                            <div style={{ textAlign: "right", flexShrink: 0 }}>
                              <BallRating value={avg} />
                              <div className="mono" style={{ fontSize: 11, color: "#4C5A4D", marginTop: 4 }}>
                                {count > 0 ? `${avg.toFixed(1)} · ${count} review${count !== 1 ? "s" : ""}` : "no reviews yet"}
                              </div>
                            </div>
                          </button>

                          {isOpen && (
                          <div style={{ borderTop: "1.5px solid #DCD0AE", padding: "14px 16px 18px", background: "#EDEFE4" }}>
                            {(reviews[course.id] || []).length > 0 && (
                              <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 16 }}>
                                {(reviews[course.id] || [])
                                  .slice()
                                  .reverse()
                                  .map((r) => (
                                    <div key={r.id} style={{ background: "#F6F4EA", border: "1px solid #DCD0AE", borderRadius: 8, padding: "10px 12px" }}>
                                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                        <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
                                          <Avatar name={r.name} src={avatars[r.name]} size={20} />
                                          <span className="body-f" style={{ fontWeight: 600, fontSize: 14 }}>{r.name}</span>
                                        </span>
                                        <BallRating value={r.rating} size={11} />
                                      </div>
                                      <p className="body-f" style={{ fontSize: 13.5, margin: "6px 0 0", lineHeight: 1.45, color: "#333" }}>
                                        {r.comment}
                                      </p>
                                      {reviewPhotos[r.id] && (
                                        <button
                                          onClick={() => setLightboxPhoto(reviewPhotos[r.id])}
                                          style={{ padding: 0, border: "none", background: "none", cursor: "pointer", display: "block", marginTop: 8 }}
                                          aria-label="View photo"
                                        >
                                          <img
                                            src={reviewPhotos[r.id]}
                                            alt="Course photo"
                                            style={{ width: 140, height: 100, objectFit: "cover", borderRadius: 8, border: "1.5px solid #DCD0AE", display: "block" }}
                                          />
                                        </button>
                                      )}
                                      <div className="mono" style={{ fontSize: 10.5, color: "#7A8A7B", marginTop: 6 }}>
                                        {r.date}
                                      </div>
                                    </div>
                                  ))}
                              </div>
                            )}

                            <div className="mono" style={{ fontSize: 11, color: "#3C6E71", marginBottom: 8, letterSpacing: "0.05em" }}>
                              RATE THIS COURSE
                            </div>
                            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                              <input
                                value={formName}
                                onChange={(e) => setFormName(e.target.value)}
                                placeholder="Your name"
                                className="body-f"
                                style={{ padding: "9px 11px", borderRadius: 7, border: "1.5px solid #C9C0A0", fontSize: 14 }}
                              />
                              <StarPicker value={formRating} onChange={setFormRating} />
                              <textarea
                                value={formComment}
                                onChange={(e) => setFormComment(e.target.value)}
                                placeholder="What was it like? Conditions, standout holes, tips for other golfers…"
                                rows={3}
                                className="body-f"
                                style={{ padding: "9px 11px", borderRadius: 7, border: "1.5px solid #C9C0A0", fontSize: 14, resize: "vertical" }}
                              />

                              {formPhoto ? (
                                <div style={{ position: "relative", width: 120 }}>
                                  <img
                                    src={formPhoto}
                                    alt="Selected"
                                    style={{ width: 120, height: 90, objectFit: "cover", borderRadius: 8, border: "1.5px solid #C9C0A0", display: "block" }}
                                  />
                                  <button
                                    onClick={() => setFormPhoto(null)}
                                    className="mono"
                                    aria-label="Remove photo"
                                    style={{
                                      position: "absolute",
                                      top: -8,
                                      right: -8,
                                      width: 22,
                                      height: 22,
                                      borderRadius: "50%",
                                      border: "1.5px solid #2F5233",
                                      background: "#F6F4EA",
                                      color: "#2F5233",
                                      fontSize: 12,
                                      fontWeight: 600,
                                      cursor: "pointer",
                                      lineHeight: 1,
                                    }}
                                  >
                                    ✕
                                  </button>
                                </div>
                              ) : (
                                <button
                                  onClick={() => reviewPhotoInputRef.current && reviewPhotoInputRef.current.click()}
                                  disabled={photoProcessing}
                                  className="body-f"
                                  style={{
                                    alignSelf: "flex-start",
                                    padding: "7px 14px",
                                    borderRadius: 7,
                                    border: "1.5px solid #3C6E71",
                                    background: "transparent",
                                    color: "#3C6E71",
                                    fontWeight: 600,
                                    fontSize: 12.5,
                                    cursor: photoProcessing ? "default" : "pointer",
                                  }}
                                >
                                  {photoProcessing ? "Processing…" : "+ Add a photo"}
                                </button>
                              )}
                              <input
                                ref={reviewPhotoInputRef}
                                type="file"
                                accept="image/*"
                                onChange={onReviewPhotoSelected}
                                style={{ display: "none" }}
                              />

                              {error && (
                                <div className="body-f" style={{ color: "#9C3D2E", fontSize: 13 }}>{error}</div>
                              )}
                              <button
                                onClick={() => submitReview(course.id)}
                                disabled={saving}
                                className="body-f"
                                style={{
                                  alignSelf: "flex-start",
                                  padding: "9px 18px",
                                  borderRadius: 7,
                                  border: "none",
                                  background: "#2F5233",
                                  color: "#EDEFE4",
                                  fontWeight: 600,
                                  fontSize: 14,
                                  cursor: saving ? "default" : "pointer",
                                  opacity: saving ? 0.6 : 1,
                                }}
                              >
                                {saving ? "Posting…" : "Post review"}
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </section>
              </React.Fragment>
            );
          })}

        {loaded && view === "courses" && filtered.length === 0 && (
          <div className="body-f" style={{ textAlign: "center", padding: 40, color: "#3C6E71" }}>
            No courses match that search.
          </div>
        )}

        {loaded && view === "reviews" && (
          <section>
            <div style={{ display: "flex", alignItems: "center", gap: 10, margin: "4px 0 16px" }}>
              <span className="disp" style={{ fontSize: 20, fontWeight: 600, color: "#2F5233" }}>
                What golfers are saying
              </span>
              <span style={{ flex: 1, height: 1, background: "#C9C0A0" }} />
            </div>

            {allReviews.length === 0 && (
              <div className="body-f" style={{ textAlign: "center", padding: 40, color: "#3C6E71" }}>
                No reviews yet — be the first to rate a course.
              </div>
            )}

            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {allReviews.map((r) => (
                <div
                  key={r.id}
                  style={{ border: "1.5px solid #DCD0AE", borderRadius: 10, background: "#F6F4EA", padding: "12px 16px" }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 10 }}>
                    <button
                      onClick={() => {
                        setView("courses");
                        setQuery("");
                        setCountry("All");
                        setCounty("All");
                        setExpanded(r.courseId);
                      }}
                      className="disp"
                      style={{
                        background: "none",
                        border: "none",
                        padding: 0,
                        textAlign: "left",
                        fontSize: 15.5,
                        fontWeight: 600,
                        color: "#2F5233",
                        cursor: "pointer",
                        textDecoration: "underline",
                        textUnderlineOffset: "3px",
                      }}
                    >
                      {r.courseName}
                    </button>
                    <BallRating value={r.rating} size={12} />
                  </div>
                  <div className="mono" style={{ fontSize: 10.5, color: "#7A8A7B", marginTop: 3 }}>
                    Co. {r.county}
                  </div>
                  <p className="body-f" style={{ fontSize: 13.5, margin: "8px 0 0", lineHeight: 1.45, color: "#333" }}>
                    {r.comment}
                  </p>
                  {reviewPhotos[r.id] && (
                    <button
                      onClick={() => setLightboxPhoto(reviewPhotos[r.id])}
                      style={{ padding: 0, border: "none", background: "none", cursor: "pointer", display: "block", marginTop: 8 }}
                      aria-label="View photo"
                    >
                      <img
                        src={reviewPhotos[r.id]}
                        alt="Course photo"
                        style={{ width: 160, height: 110, objectFit: "cover", borderRadius: 8, border: "1.5px solid #DCD0AE", display: "block" }}
                      />
                    </button>
                  )}
                  <div className="body-f" style={{ fontSize: 12, color: "#4C5A4D", marginTop: 8, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      <Avatar name={r.name} src={avatars[r.name]} size={20} />
                      <span style={{ fontWeight: 600 }}>{r.name}</span>
                    </span>
                    <span className="mono" style={{ color: "#7A8A7B" }}>{r.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {loaded && view === "leaderboard" && (
          <section>
            <div style={{ display: "flex", alignItems: "center", gap: 10, margin: "4px 0 6px" }}>
              <span className="disp" style={{ fontSize: 20, fontWeight: 600, color: "#2F5233" }}>
                Top 25 courses
              </span>
              <span style={{ flex: 1, height: 1, background: "#C9C0A0" }} />
            </div>
            <p className="body-f" style={{ fontSize: 12.5, color: "#4C5A4D", margin: "0 0 16px" }}>
              Ranked by average community rating{leaderboard.some((x) => x.count >= 3) ? " (3+ reviews to qualify)" : ""}.
            </p>

            {leaderboard.length === 0 && (
              <div className="body-f" style={{ textAlign: "center", padding: 40, color: "#3C6E71" }}>
                No courses have been rated yet — post the first review to kick off the leaderboard.
              </div>
            )}

            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {leaderboard.map((entry, idx) => {
                const rank = idx + 1;
                const medal = rank === 1 ? "#D9A404" : rank === 2 ? "#B8BEC1" : rank === 3 ? "#C17A4B" : "#DCD0AE";
                return (
                  <button
                    key={entry.course.id}
                    onClick={() => {
                      setView("courses");
                      setQuery("");
                      setCountry("All");
                      setCounty("All");
                      setExpanded(entry.course.id);
                    }}
                    className="course-card"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                      width: "100%",
                      textAlign: "left",
                      border: "1.5px solid #DCD0AE",
                      borderRadius: 10,
                      background: "#F6F4EA",
                      padding: "12px 14px",
                      cursor: "pointer",
                    }}
                  >
                    <span
                      className="mono"
                      style={{
                        flexShrink: 0,
                        width: 30,
                        height: 30,
                        borderRadius: "50%",
                        background: medal,
                        color: rank <= 3 ? "#1B2B22" : "#4C5A4D",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 12.5,
                        fontWeight: 600,
                      }}
                    >
                      {rank}
                    </span>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div className="disp" style={{ fontSize: 15.5, fontWeight: 600, color: "#182619" }}>
                        {entry.course.name}
                      </div>
                      <div className="mono" style={{ fontSize: 10.5, color: "#3C6E71", marginTop: 2 }}>
                        Co. {entry.course.county} · {entry.course.country === "Northern Ireland" ? "NI" : "ROI"}
                      </div>
                    </div>
                    <div style={{ textAlign: "right", flexShrink: 0 }}>
                      <BallRating value={entry.avg} size={12} />
                      <div className="mono" style={{ fontSize: 10.5, color: "#4C5A4D", marginTop: 3 }}>
                        {entry.avg.toFixed(1)} · {entry.count} review{entry.count !== 1 ? "s" : ""}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </section>
        )}

        {loaded && view === "friends" && (
          <section>
            {/* Your profile */}
            <div style={{ border: "1.5px solid #DCD0AE", borderRadius: 10, background: "#F6F4EA", padding: "14px 16px", marginBottom: 20 }}>
              <div className="mono" style={{ fontSize: 11, color: "#3C6E71", letterSpacing: "0.05em", marginBottom: 8 }}>
                YOUR PROFILE
              </div>
              {!myName ? (
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  <div style={{ display: "flex", gap: 6 }}>
                    <button
                      onClick={() => {
                        setAuthMode("login");
                        setAuthError(null);
                      }}
                      className="mono"
                      style={{
                        flex: 1,
                        padding: "7px 6px",
                        borderRadius: 7,
                        border: "1.5px solid #2F5233",
                        background: authMode === "login" ? "#2F5233" : "transparent",
                        color: authMode === "login" ? "#EDEFE4" : "#2F5233",
                        fontSize: 11.5,
                        fontWeight: 600,
                        cursor: "pointer",
                      }}
                    >
                      LOG IN
                    </button>
                    <button
                      onClick={() => {
                        setAuthMode("signup");
                        setAuthError(null);
                      }}
                      className="mono"
                      style={{
                        flex: 1,
                        padding: "7px 6px",
                        borderRadius: 7,
                        border: "1.5px solid #2F5233",
                        background: authMode === "signup" ? "#2F5233" : "transparent",
                        color: authMode === "signup" ? "#EDEFE4" : "#2F5233",
                        fontSize: 11.5,
                        fontWeight: 600,
                        cursor: "pointer",
                      }}
                    >
                      SIGN UP
                    </button>
                  </div>

                  <p className="body-f" style={{ fontSize: 12.5, color: "#4C5A4D", margin: 0 }}>
                    {authMode === "login"
                      ? "Log in to sync your name and photo, and see who's following you."
                      : "Claim your username with a password so nobody else can post as you."}
                  </p>

                  <input
                    value={usernameDraft}
                    onChange={(e) => {
                      setUsernameDraft(e.target.value);
                      if (authError) setAuthError(null);
                    }}
                    placeholder="Username"
                    autoCapitalize="none"
                    className="body-f"
                    style={{ padding: "9px 11px", borderRadius: 7, border: "1.5px solid #C9C0A0", fontSize: 14 }}
                  />
                  <input
                    value={passwordDraft}
                    onChange={(e) => {
                      setPasswordDraft(e.target.value);
                      if (authError) setAuthError(null);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && authMode === "login") handleLogIn();
                    }}
                    type="password"
                    placeholder="Password"
                    className="body-f"
                    style={{ padding: "9px 11px", borderRadius: 7, border: "1.5px solid #C9C0A0", fontSize: 14 }}
                  />
                  {authMode === "signup" && (
                    <input
                      value={password2Draft}
                      onChange={(e) => {
                        setPassword2Draft(e.target.value);
                        if (authError) setAuthError(null);
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") handleSignUp();
                      }}
                      type="password"
                      placeholder="Confirm password"
                      className="body-f"
                      style={{ padding: "9px 11px", borderRadius: 7, border: "1.5px solid #C9C0A0", fontSize: 14 }}
                    />
                  )}

                  <button
                    onClick={authMode === "login" ? handleLogIn : handleSignUp}
                    disabled={authLoading}
                    className="body-f"
                    style={{
                      padding: "10px 16px",
                      borderRadius: 7,
                      border: "none",
                      background: "#2F5233",
                      color: "#EDEFE4",
                      fontWeight: 600,
                      fontSize: 14,
                      cursor: authLoading ? "default" : "pointer",
                      opacity: authLoading ? 0.6 : 1,
                    }}
                  >
                    {authLoading ? "Please wait…" : authMode === "login" ? "Log in" : "Create account"}
                  </button>

                  {authError && (
                    <div className="body-f" style={{ color: "#9C3D2E", fontSize: 12.5 }}>{authError}</div>
                  )}

                  <p className="body-f" style={{ fontSize: 11, color: "#7A8A7B", margin: 0, lineHeight: 1.4 }}>
                    This just keeps your name and photo yours within the app — it isn't bank-grade security, so please don't reuse an important password.
                  </p>
                </div>
              ) : (
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12, minWidth: 0 }}>
                    <div style={{ position: "relative", flexShrink: 0 }}>
                      <button
                        onClick={() => fileInputRef.current && fileInputRef.current.click()}
                        disabled={avatarSaving}
                        style={{ padding: 0, border: "none", background: "none", cursor: avatarSaving ? "default" : "pointer", display: "block" }}
                        aria-label="Change profile picture"
                      >
                        <Avatar name={myName} src={avatars[myName]} size={52} />
                      </button>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={onAvatarSelected}
                        style={{ display: "none" }}
                      />
                    </div>
                    <div style={{ minWidth: 0 }}>
                      <div className="disp" style={{ fontSize: 18, fontWeight: 600 }}>{myName}</div>
                      <div className="mono" style={{ fontSize: 11.5, color: "#4C5A4D", marginTop: 2 }}>
                        {myProfile && myProfile.count > 0
                          ? `${myProfile.count} course${myProfile.count !== 1 ? "s" : ""} rated · avg ${myProfile.avg.toFixed(1)}`
                          : "no reviews posted yet"}
                      </div>
                      <button
                        onClick={() => fileInputRef.current && fileInputRef.current.click()}
                        disabled={avatarSaving}
                        className="body-f"
                        style={{ background: "none", border: "none", color: "#3C6E71", fontSize: 12, textDecoration: "underline", cursor: avatarSaving ? "default" : "pointer", padding: 0, marginTop: 4 }}
                      >
                        {avatarSaving ? "Saving photo…" : avatars[myName] ? "Change photo" : "Add photo"}
                      </button>
                    </div>
                  </div>
                  <button
                    onClick={handleLogOut}
                    className="body-f"
                    style={{ background: "none", border: "none", color: "#3C6E71", fontSize: 12.5, textDecoration: "underline", cursor: "pointer", flexShrink: 0 }}
                  >
                    log out
                  </button>
                </div>
              )}
              {myName && error && (
                <div className="body-f" style={{ color: "#9C3D2E", fontSize: 12.5, marginTop: 10 }}>{error}</div>
              )}
            </div>

            {/* Your friends */}
            <div style={{ margin: "18px 0 10px" }}>
              <span className="disp" style={{ fontSize: 19, fontWeight: 600, color: "#2F5233" }}>
                Your friends
              </span>
            </div>
            {friends.length === 0 && (
              <p className="body-f" style={{ fontSize: 13.5, color: "#4C5A4D" }}>
                You're not following anyone yet — add a friend below to see the courses they've played.
              </p>
            )}
            <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 24 }}>
              {friendProfiles.map((f) => {
                const isOpen = openFriend === f.name;
                return (
                  <div key={f.name} className="course-card" style={{ border: "1.5px solid #DCD0AE", borderRadius: 10, background: "#F6F4EA", overflow: "hidden" }}>
                    <button
                      onClick={() => setOpenFriend(isOpen ? null : f.name)}
                      style={{ width: "100%", textAlign: "left", padding: "14px 16px", background: "transparent", border: "none", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: 10, minWidth: 0 }}>
                        <Avatar name={f.name} src={avatars[f.name]} size={38} />
                        <div style={{ minWidth: 0 }}>
                          <div className="disp" style={{ fontSize: 16.5, fontWeight: 600 }}>{f.name}</div>
                          <div className="mono" style={{ fontSize: 11, color: "#3C6E71", marginTop: 3 }}>
                            {f.count} course{f.count !== 1 ? "s" : ""} played
                          </div>
                        </div>
                      </div>
                      <BallRating value={f.avg} />
                    </button>
                    {isOpen && (
                      <div style={{ borderTop: "1.5px solid #DCD0AE", padding: "12px 16px", background: "#EDEFE4" }}>
                        {f.reviews.length === 0 ? (
                          <p className="body-f" style={{ fontSize: 13, color: "#4C5A4D", margin: 0 }}>No reviews yet.</p>
                        ) : (
                          <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 12 }}>
                            {f.reviews
                              .slice()
                              .sort((a, b) => (a.id < b.id ? 1 : -1))
                              .map((r) => (
                                <div key={r.id} style={{ background: "#F6F4EA", border: "1px solid #DCD0AE", borderRadius: 8, padding: "9px 11px" }}>
                                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                    <span className="body-f" style={{ fontWeight: 600, fontSize: 13.5 }}>{r.courseName}</span>
                                    <BallRating value={r.rating} size={10} />
                                  </div>
                                  <p className="body-f" style={{ fontSize: 12.5, margin: "4px 0 0", lineHeight: 1.4, color: "#333" }}>{r.comment}</p>
                                  {reviewPhotos[r.id] && (
                                    <button
                                      onClick={() => setLightboxPhoto(reviewPhotos[r.id])}
                                      style={{ padding: 0, border: "none", background: "none", cursor: "pointer", display: "block", marginTop: 6 }}
                                      aria-label="View photo"
                                    >
                                      <img
                                        src={reviewPhotos[r.id]}
                                        alt="Course photo"
                                        style={{ width: 100, height: 72, objectFit: "cover", borderRadius: 6, border: "1.5px solid #DCD0AE", display: "block" }}
                                      />
                                    </button>
                                  )}
                                  <div className="mono" style={{ fontSize: 10, color: "#7A8A7B", marginTop: 4 }}>Co. {r.county} · {r.date}</div>
                                </div>
                              ))}
                          </div>
                        )}
                        <button
                          onClick={() => toggleFriend(f.name)}
                          className="body-f"
                          style={{ padding: "7px 14px", borderRadius: 7, border: "1.5px solid #9C3D2E", background: "transparent", color: "#9C3D2E", fontWeight: 600, fontSize: 12.5, cursor: "pointer" }}
                        >
                          Unfollow
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Find golfers */}
            <div style={{ margin: "18px 0 10px" }}>
              <span className="disp" style={{ fontSize: 19, fontWeight: 600, color: "#2F5233" }}>
                Find golfers
              </span>
            </div>
            <input
              value={friendSearch}
              onChange={(e) => setFriendSearch(e.target.value)}
              placeholder="Search reviewers by name…"
              className="body-f"
              style={{ width: "100%", padding: "10px 12px", borderRadius: 8, border: "1.5px solid #C9C0A0", fontSize: 14, marginBottom: 10 }}
            />
            {filteredReviewers.length === 0 && (
              <p className="body-f" style={{ fontSize: 13.5, color: "#4C5A4D" }}>
                No reviewers match that search yet — once golfers start posting reviews, they'll show up here.
              </p>
            )}
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {filteredReviewers.map((p) => {
                const isFriend = friends.includes(p.name);
                return (
                  <div key={p.name} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", border: "1.5px solid #DCD0AE", borderRadius: 8, background: "#F6F4EA", padding: "10px 14px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, minWidth: 0 }}>
                      <Avatar name={p.name} src={avatars[p.name]} size={32} />
                      <div style={{ minWidth: 0 }}>
                        <div className="body-f" style={{ fontWeight: 600, fontSize: 14 }}>{p.name}</div>
                        <div className="mono" style={{ fontSize: 10.5, color: "#4C5A4D" }}>
                          {p.count > 0 ? `${p.count} course${p.count !== 1 ? "s" : ""} · avg ${p.avg.toFixed(1)}` : "no reviews yet"}
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => toggleFriend(p.name)}
                      className="body-f"
                      style={{
                        padding: "6px 14px",
                        borderRadius: 7,
                        border: isFriend ? "1.5px solid #C9C0A0" : "1.5px solid #2F5233",
                        background: isFriend ? "transparent" : "#2F5233",
                        color: isFriend ? "#4C5A4D" : "#EDEFE4",
                        fontWeight: 600,
                        fontSize: 12.5,
                        cursor: "pointer",
                      }}
                    >
                      {isFriend ? "Following" : "+ Add"}
                    </button>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        <p className="body-f" style={{ fontSize: 11.5, color: "#7A8A7B", marginTop: 30, lineHeight: 1.5 }}>
          Ratings and reviews are visible to everyone using this app. Course details are compiled from public sources
          — if something's out of date, mention it in a review.
        </p>
      </main>

      {lightboxPhoto && (
        <div
          onClick={() => setLightboxPhoto(null)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(15, 27, 18, 0.92)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 24,
            zIndex: 1000,
            cursor: "zoom-out",
          }}
        >
          <img
            src={lightboxPhoto}
            alt="Course photo, full size"
            style={{ maxWidth: "100%", maxHeight: "85vh", borderRadius: 10, boxShadow: "0 10px 40px rgba(0,0,0,0.5)" }}
          />
          <button
            onClick={() => setLightboxPhoto(null)}
            aria-label="Close photo"
            className="mono"
            style={{
              position: "fixed",
              top: 18,
              right: 18,
              width: 36,
              height: 36,
              borderRadius: "50%",
              border: "1.5px solid #EDEFE4",
              background: "rgba(0,0,0,0.3)",
              color: "#EDEFE4",
              fontSize: 16,
              cursor: "pointer",
            }}
          >
            ✕
          </button>
        </div>
      )}
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
