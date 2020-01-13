import React, { Component } from 'react'
import Select from 'react-select'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendarAlt, faLandmark } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
var Scroll = require('react-scroll');

var Link = Scroll.Link;
var Element = Scroll.Element;
var Events = Scroll.Events;
var scroll = Scroll.animateScroll;
var scrollSpy = Scroll.scrollSpy;


const Checkbox = props => (
    <input type="checkbox" {...props} />
)

const visaOfficeList = [
    { label: "Abu Dhabi", value: "Abu Dhabi" }, { label: "Accra", value: "Accra" }, { label: "Amman", value: "Amman" }, { label: "Ankara", value: "Ankara" }, { label: "Bangkok", value: "Bangkok" }, { label: "Beijing", value: "Beijing" }, { label: "Beirut", value: "Beirut" }, { label: "Bengaluru (Bangalore)", value: "Bengaluru (Bangalore)" }, { label: "Bogota", value: "Bogota" }, { label: "Bucharest", value: "Bucharest" }, { label: "Buenos Aires", value: "Buenos Aires" }, { label: "Cairo", value: "Cairo" }, { label: "Chandigarh", value: "Chandigarh" }, { label: "Colombo", value: "Colombo" }, { label: "Dakar", value: "Dakar" }, { label: "Dar es Salaam", value: "Dar es Salaam" }, { label: "Edmonton", value: "Edmonton" }, { label: "Guangzhou", value: "Guangzhou" }, { label: "Havana", value: "Havana" }, { label: "Ho Chi Minh City", value: "Ho Chi Minh City" }, { label: "Hong Kong SAR", value: "Hong Kong SAR" }, { label: "Islamabad", value: "Islamabad" }, { label: "Jakarta", value: "Jakarta" }, { label: "Kingston", value: "Kingston" }, { label: "Kyiv", value: "Kyiv" }, { label: "Lagos", value: "Lagos" }, { label: "Lima", value: "Lima" }, { label: "London", value: "London" }, { label: "Los Angeles", value: "Los Angeles" }, { label: "Manila", value: "Manila" }, { label: "Mexico", value: "Mexico" }, { label: "Mexico City", value: "Mexico City" }, { label: "Moscow", value: "Moscow" }, { label: "Nairobi", value: "Nairobi" }, { label: "New Delhi", value: "New Delhi" }, { label: "New York", value: "New York" }, { label: "Paris", value: "Paris" }, { label: "Port of Spain", value: "Port of Spain" }, { label: "Port-au-Prince", value: "Port-au-Prince" }, { label: "Pretoria", value: "Pretoria" }, { label: "Rabat", value: "Rabat" }, { label: "Riyadh", value: "Riyadh" }, { label: "Rome", value: "Rome" }, { label: "Sao Paulo", value: "Sao Paulo" }, { label: "Shanghai", value: "Shanghai" }, { label: "Singapore", value: "Singapore" }, { label: "Sydney", value: "Sydney" }, { label: "Tel Aviv", value: "Tel Aviv" }, { label: "Tunis", value: "Tunis" }, { label: "Vancouver", value: "Vancouver" }
]

const provinceList = [
    { label: "ALBERTA", value: "ALBERTA" }, { label: "BRITISH COLUMBIA", value: "BRITISH COLUMBIA" }, { label: "MANITOBA", value: "MANITOBA" }, { label: "NEW BRUNSWICK", value: "NEW BRUNSWICK" }, { label: "NEWFOUNDLAND and LABRADOR", value: "NEWFOUNDLAND and LABRADOR" }, { label: "NORTHWEST TERRITORIES", value: "NORTHWEST TERRITORIES" }, { label: "NOVA SCOTIA", value: "NOVA SCOTIA" }, { label: "NUNAVUT", value: "NUNAVUT" }, { label: "ONTARIO", value: "ONTARIO" }, { label: "PRINCE EDWARD ISLAND", value: "PRINCE EDWARD ISLAND" }, { label: "SASKATCHEWAN", value: "SASKATCHEWAN" }, { label: "YUKON", value: "YUKON" }
]
const NOCList = [
    { value: '0011', label: '0011 - Legislators' },
    { value: '0012', label: '0012 - Senior government managers and officials' },
    { value: '0013', label: '0013 - Senior managers – financial, communications and other business services' },
    { value: '0014', label: '0014 - Senior managers – health, education, social and community services' },
    { value: '0015', label: '0015 - Senior managers – trade, broadcasting and other services, n.e.c.' },
    { value: '0016', label: '0016 - Senior managers – construction, transportation, production and utilities' },
    { value: '0111', label: '0111 - Financial managers' },
    { value: '0112', label: '0112 - Human resources managers' },
    { value: '0113', label: '0113 - Purchasing managers' },
    { value: '0114', label: '0114 - Other administrative services managers' },
    { value: '0121', label: '0121 - Insurance, real estate and financial brokerage managers' },
    { value: '0122', label: '0122 - Banking, credit and other investment managers' },
    { value: '0124', label: '0124 - Advertising, marketing and public relations managers' },
    { value: '0125', label: '0125 - Other business services managers' },
    { value: '0131', label: '0131 - Telecommunication carriers managers' },
    { value: '0132', label: '0132 - Postal and courier services managers' },
    { value: '0211', label: '0211 - Engineering managers' },
    { value: '0212', label: '0212 - Architecture and science managers' },
    { value: '0213', label: '0213 - Computer and information systems managers' },
    { value: '0311', label: '0311 - Managers in health care' },
    { value: '0411', label: '0411 - Government managers – health and social policy development and program administration' },
    { value: '0412', label: '0412 - Government managers – economic analysis, policy development and program administration' },
    { value: '0413', label: '0413 - Government managers – education policy development and program administration' },
    { value: '0414', label: '0414 - Other managers in public administration' },
    { value: '0421', label: '0421 - Administrators – post-secondary education and vocational training' },
    { value: '0422', label: '0422 - School principals and administrators of elementary and secondary education' },
    { value: '0423', label: '0423 - Managers in social, community and correctional services' },
    { value: '0431', label: '0431 - Commissioned police officers' },
    { value: '0432', label: '0432 - Fire chiefs and senior firefighting officers' },
    { value: '0433', label: '0433 - Commissioned officers of the Canadian Forces' },
    { value: '0511', label: '0511 - Library, archive, museum and art gallery managers' },
    { value: '0512', label: '0512 - Managers – publishing, motion pictures, broadcasting and performing arts' },
    { value: '0513', label: '0513 - Recreation, sports and fitness program and service directors' },
    { value: '0601', label: '0601 - Corporate sales managers' },
    { value: '0621', label: '0621 - Retail and wholesale trade managers' },
    { value: '0631', label: '0631 - Restaurant and food service managers' },
    { value: '0632', label: '0632 - Accommodation service managers' },
    { value: '0651', label: '0651 - Managers in customer and personal services, n.e.c.' },
    { value: '0711', label: '0711 - Construction managers' },
    { value: '0712', label: '0712 - Home building and renovation managers' },
    { value: '0714', label: '0714 - Facility operation and maintenance managers' },
    { value: '0731', label: '0731 - Managers in transportation' },
    { value: '0811', label: '0811 - Managers in natural resources production and fishing' },
    { value: '0821', label: '0821 - Managers in agriculture' },
    { value: '0822', label: '0822 - Managers in horticulture' },
    { value: '0823', label: '0823 - Managers in aquaculture' },
    { value: '0911', label: '0911 - Manufacturing managers' },
    { value: '0912', label: '0912 - Utilities managers' },
    { value: '1111', label: '1111 - Financial auditors and accountants' },
    { value: '1112', label: '1112 - Financial and investment analysts' },
    { value: '1113', label: '1113 - Securities agents, investment dealers and brokers' },
    { value: '1114', label: '1114 - Other financial officers' },
    { value: '1121', label: '1121 - Human resources professionals' },
    { value: '1122', label: '1122 - Professional occupations in business management consulting' },
    { value: '1123', label: '1123 - Professional occupations in advertising, marketing and public relations' },
    { value: '1211', label: '1211 - Supervisors, general office and administrative support workers' },
    { value: '1212', label: '1212 - Supervisors, finance and insurance office workers' },
    { value: '1213', label: '1213 - Supervisors, library, correspondence and related information workers' },
    { value: '1214', label: '1214 - Supervisors, mail and message distribution occupations' },
    { value: '1215', label: '1215 - Supervisors, supply chain, tracking and scheduling co-ordination occupations' },
    { value: '1221', label: '1221 - Administrative officers' },
    { value: '1222', label: '1222 - Executive assistants' },
    { value: '1223', label: '1223 - Human resources and recruitment officers' },
    { value: '1224', label: '1224 - Property administrators' },
    { value: '1225', label: '1225 - Purchasing agents and officers' },
    { value: '1226', label: '1226 - Conference and event planners' },
    { value: '1227', label: '1227 - Court officers and justices of the peace' },
    { value: '1228', label: '1228 - Employment insurance, immigration, border services and revenue officers' },
    { value: '1241', label: '1241 - Administrative assistants' },
    { value: '1242', label: '1242 - Legal administrative assistants' },
    { value: '1243', label: '1243 - Medical administrative assistants' },
    { value: '1251', label: '1251 - Court reporters, medical transcriptionists and related occupations' },
    { value: '1252', label: '1252 - Health information management occupations' },
    { value: '1253', label: '1253 - Records management technicians' },
    { value: '1254', label: '1254 - Statistical officers and related research support occupations' },
    { value: '1311', label: '1311 - Accounting technicians and bookkeepers' },
    { value: '1312', label: '1312 - Insurance adjusters and claims examiners' },
    { value: '1313', label: '1313 - Insurance underwriters' },
    { value: '1314', label: '1314 - Assessors, valuators and appraisers' },
    { value: '1315', label: '1315 - Customs, ship and other brokers' },
    { value: '1411', label: '1411 - General office support workers' },
    { value: '1414', label: '1414 - Receptionists' },
    { value: '1415', label: '1415 - Personnel clerks' },
    { value: '1416', label: '1416 - Court clerks' },
    { value: '1422', label: '1422 - Data entry clerks' },
    { value: '1423', label: '1423 - Desktop publishing operators and related occupations' },
    { value: '1431', label: '1431 - Accounting and related clerks' },
    { value: '1432', label: '1432 - Payroll clerks' },
    { value: '1434', label: '1434 - Banking, insurance and other financial clerks' },
    { value: '1435', label: '1435 - Collectors' },
    { value: '1451', label: '1451 - Library assistants and clerks' },
    { value: '1452', label: '1452 - Correspondence, publication and regulatory clerks' },
    { value: '1454', label: '1454 - Survey interviewers and statistical clerks' },
    { value: '1511', label: '1511 - Mail, postal and related workers' },
    { value: '1512', label: '1512 - Letter carriers' },
    { value: '1513', label: '1513 - Couriers, messengers and door-to-door distributors' },
    { value: '1521', label: '1521 - Shippers and receivers' },
    { value: '1522', label: '1522 - Storekeepers and partspersons' },
    { value: '1523', label: '1523 - Production logistics co-ordinators' },
    { value: '1524', label: '1524 - Purchasing and inventory control workers' },
    { value: '1525', label: '1525 - Dispatchers' },
    { value: '1526', label: '1526 - Transportation route and crew schedulers' },
    { value: '2111', label: '2111 - Physicists and astronomers' },
    { value: '2112', label: '2112 - Chemists' },
    { value: '2113', label: '2113 - Geoscientists and oceanographers' },
    { value: '2114', label: '2114 - Meteorologists and climatologists' },
    { value: '2115', label: '2115 - Other professional occupations in physical sciences' },
    { value: '2121', label: '2121 - Biologists and related scientists' },
    { value: '2122', label: '2122 - Forestry professionals' },
    { value: '2123', label: '2123 - Agricultural representatives, consultants and specialists' },
    { value: '2131', label: '2131 - Civil engineers' },
    { value: '2132', label: '2132 - Mechanical engineers' },
    { value: '2133', label: '2133 - Electrical and electronics engineers' },
    { value: '2134', label: '2134 - Chemical engineers' },
    { value: '2141', label: '2141 - Industrial and manufacturing engineers' },
    { value: '2142', label: '2142 - Metallurgical and materials engineers' },
    { value: '2143', label: '2143 - Mining engineers' },
    { value: '2144', label: '2144 - Geological engineers' },
    { value: '2145', label: '2145 - Petroleum engineers' },
    { value: '2146', label: '2146 - Aerospace engineers' },
    { value: '2147', label: '2147 - Computer engineers (except software engineers and designers)' },
    { value: '2148', label: '2148 - Other professional engineers, n.e.c.' },
    { value: '2151', label: '2151 - Architects' },
    { value: '2152', label: '2152 - Landscape architects' },
    { value: '2153', label: '2153 - Urban and land use planners' },
    { value: '2154', label: '2154 - Land surveyors' },
    { value: '2161', label: '2161 - Mathematicians, statisticians and actuaries' },
    { value: '2171', label: '2171 - Information systems analysts and consultants' },
    { value: '2172', label: '2172 - Database analysts and data administrators' },
    { value: '2173', label: '2173 - Software engineers and designers' },
    { value: '2174', label: '2174 - Computer programmers and interactive media developers' },
    { value: '2175', label: '2175 - Web designers and developers' },
    { value: '2211', label: '2211 - Chemical technologists and technicians' },
    { value: '2212', label: '2212 - Geological and mineral technologists and technicians' },
    { value: '2221', label: '2221 - Biological technologists and technicians' },
    { value: '2222', label: '2222 - Agricultural and fish products inspectors' },
    { value: '2223', label: '2223 - Forestry technologists and technicians' },
    { value: '2224', label: '2224 - Conservation and fishery officers' },
    { value: '2225', label: '2225 - Landscape and horticulture technicians and specialists' },
    { value: '2231', label: '2231 - Civil engineering technologists and technicians' },
    { value: '2232', label: '2232 - Mechanical engineering technologists and technicians' },
    { value: '2233', label: '2233 - Industrial engineering and manufacturing technologists and technicians' },
    { value: '2234', label: '2234 - Construction estimators' },
    { value: '2241', label: '2241 - Electrical and electronics engineering technologists and technicians' },
    { value: '2242', label: '2242 - Electronic service technicians (household and business equipment)' },
    { value: '2243', label: '2243 - Industrial instrument technicians and mechanics' },
    { value: '2244', label: '2244 - Aircraft instrument, electrical and avionics mechanics, technicians and inspectors' },
    { value: '2251', label: '2251 - Architectural technologists and technicians' },
    { value: '2252', label: '2252 - Industrial designers' },
    { value: '2253', label: '2253 - Drafting technologists and technicians' },
    { value: '2254', label: '2254 - Land survey technologists and technicians' },
    { value: '2255', label: '2255 - Technical occupations in geomatics and meteorology' },
    { value: '2261', label: '2261 - Non-destructive testers and inspection technicians' },
    { value: '2262', label: '2262 - Engineering inspectors and regulatory officers' },
    { value: '2263', label: '2263 - Inspectors in public and environmental health and occupational health and safety' },
    { value: '2264', label: '2264 - Construction inspectors' },
    { value: '2271', label: '2271 - Air pilots, flight engineers and flying instructors' },
    { value: '2272', label: '2272 - Air traffic controllers and related occupations' },
    { value: '2273', label: '2273 - Deck officers, water transport' },
    { value: '2274', label: '2274 - Engineer officers, water transport' },
    { value: '2275', label: '2275 - Railway traffic controllers and marine traffic regulators' },
    { value: '2281', label: '2281 - Computer network technicians' },
    { value: '2282', label: '2282 - User support technicians' },
    { value: '2283', label: '2283 - Information systems testing technicians' },
    { value: '3011', label: '3011 - Nursing co-ordinators and supervisors' },
    { value: '3012', label: '3012 - Registered nurses and registered psychiatric nurses' },
    { value: '3111', label: '3111 - Specialist physicians' },
    { value: '3112', label: '3112 - General practitioners and family physicians' },
    { value: '3113', label: '3113 - Dentists' },
    { value: '3114', label: '3114 - Veterinarians' },
    { value: '3121', label: '3121 - Optometrists' },
    { value: '3122', label: '3122 - Chiropractors' },
    { value: '3124', label: '3124 - Allied primary health practitioners' },
    { value: '3125', label: '3125 - Other professional occupations in health diagnosing and treating' },
    { value: '3131', label: '3131 - Pharmacists' },
    { value: '3132', label: '3132 - Dietitians and nutritionists' },
    { value: '3141', label: '3141 - Audiologists and speech-language pathologists' },
    { value: '3142', label: '3142 - Physiotherapists' },
    { value: '3143', label: '3143 - Occupational therapists' },
    { value: '3144', label: '3144 - Other professional occupations in therapy and assessment' },
    { value: '3211', label: '3211 - Medical laboratory technologists' },
    { value: '3212', label: '3212 - Medical laboratory technicians and pathologists’ assistants' },
    { value: '3213', label: '3213 - Animal health technologists and veterinary technicians' },
    { value: '3214', label: '3214 - Respiratory therapists, clinical perfusionists and cardiopulmonary technologists' },
    { value: '3215', label: '3215 - Medical radiation technologists' },
    { value: '3216', label: '3216 - Medical sonographers' },
    { value: '3217', label: '3217 - Cardiology technologists and electrophysiological diagnostic technologists, n.e.c.' },
    { value: '3219', label: '3219 - Other medical technologists and technicians (except dental health)' },
    { value: '3221', label: '3221 - Denturists' },
    { value: '3222', label: '3222 - Dental hygienists and dental therapists' },
    { value: '3223', label: '3223 - Dental technologists, technicians and laboratory assistants' },
    { value: '3231', label: '3231 - Opticians' },
    { value: '3232', label: '3232 - Practitioners of natural healing' },
    { value: '3233', label: '3233 - Licensed practical nurses' },
    { value: '3234', label: '3234 - Paramedical occupations' },
    { value: '3236', label: '3236 - Massage therapists' },
    { value: '3237', label: '3237 - Other technical occupations in therapy and assessment' },
    { value: '3411', label: '3411 - Dental assistants' },
    { value: '3413', label: '3413 - Nurse aides, orderlies and patient service associates' },
    { value: '3414', label: '3414 - Other assisting occupations in support of health services' },
    { value: '4011', label: '4011 - University professors and lecturers' },
    { value: '4012', label: '4012 - Post-secondary teaching and research assistants' },
    { value: '4021', label: '4021 - College and other vocational instructors' },
    { value: '4031', label: '4031 - Secondary school teachers' },
    { value: '4032', label: '4032 - Elementary school and kindergarten teachers' },
    { value: '4033', label: '4033 - Educational counsellors' },
    { value: '4111', label: '4111 - Judges' },
    { value: '4112', label: '4112 - Lawyers and Quebec notaries' },
    { value: '4151', label: '4151 - Psychologists' },
    { value: '4152', label: '4152 - Social workers' },
    { value: '4153', label: '4153 - Family, marriage and other related counsellors' },
    { value: '4154', label: '4154 - Professional occupations in religion' },
    { value: '4155', label: '4155 - Probation and parole officers and related occupations' },
    { value: '4156', label: '4156 - Employment counsellors' },
    { value: '4161', label: '4161 - Natural and applied science policy researchers, consultants and program officers' },
    { value: '4162', label: '4162 - Economists and economic policy researchers and analysts' },
    { value: '4163', label: '4163 - Business development officers and marketing researchers and consultants' },
    { value: '4164', label: '4164 - Social policy researchers, consultants and program officers' },
    { value: '4165', label: '4165 - Health policy researchers, consultants and program officers' },
    { value: '4166', label: '4166 - Education policy researchers, consultants and program officers' },
    { value: '4167', label: '4167 - Recreation, sports and fitness policy researchers, consultants and program officers' },
    { value: '4168', label: '4168 - Program officers unique to government' },
    { value: '4169', label: '4169 - Other professional occupations in social science, n.e.c.' },
    { value: '4211', label: '4211 - Paralegal and related occupations' },
    { value: '4212', label: '4212 - Social and community service workers' },
    { value: '4214', label: '4214 - Early childhood educators and assistants' },
    { value: '4215', label: '4215 - Instructors of persons with disabilities' },
    { value: '4216', label: '4216 - Other instructors' },
    { value: '4217', label: '4217 - Other religious occupations' },
    { value: '4311', label: '4311 - Police officers (except commissioned)' },
    { value: '4312', label: '4312 - Firefighters' },
    { value: '4313', label: '4313 - Non-commissioned ranks of the Canadian Forces' },
    { value: '4411', label: '4411 - Home child care providers' },
    { value: '4412', label: '4412 - Home support workers, housekeepers and related occupations' },
    { value: '4413', label: '4413 - Elementary and secondary school teacher assistants' },
    { value: '4421', label: '4421 - Sheriffs and bailiffs' },
    { value: '4422', label: '4422 - Correctional service officers' },
    { value: '4423', label: '4423 - By-law enforcement and other regulatory officers, n.e.c.' },
    { value: '5111', label: '5111 - Librarians' },
    { value: '5112', label: '5112 - Conservators and curators' },
    { value: '5113', label: '5113 - Archivists' },
    { value: '5121', label: '5121 - Authors and writers' },
    { value: '5122', label: '5122 - Editors' },
    { value: '5123', label: '5123 - Journalists' },
    { value: '5125', label: '5125 - Translators, terminologists and interpreters' },
    { value: '5131', label: '5131 - Producers, directors, choreographers and related occupations' },
    { value: '5132', label: '5132 - Conductors, composers and arrangers' },
    { value: '5133', label: '5133 - Musicians and singers' },
    { value: '5134', label: '5134 - Dancers' },
    { value: '5135', label: '5135 - Actors and comedians' },
    { value: '5136', label: '5136 - Painters, sculptors and other visual artists' },
    { value: '5211', label: '5211 - Library and public archive technicians' },
    { value: '5212', label: '5212 - Technical occupations related to museums and art galleries' },
    { value: '5221', label: '5221 - Photographers' },
    { value: '5222', label: '5222 - Film and video camera operators' },
    { value: '5223', label: '5223 - Graphic arts technicians' },
    { value: '5224', label: '5224 - Broadcast technicians' },
    { value: '5225', label: '5225 - Audio and video recording technicians' },
    { value: '5226', label: '5226 - Other technical & co-ordinating occupations in motion pictures, broadcasting & the performing arts' },
    { value: '5227', label: '5227 - Support occupations in motion pictures, broadcasting, photography and the performing arts' },
    { value: '5231', label: '5231 - Announcers and other broadcasters' },
    { value: '5232', label: '5232 - Other performers, n.e.c.' },
    { value: '5241', label: '5241 - Graphic designers and illustrators' },
    { value: '5242', label: '5242 - Interior designers and interior decorators' },
    { value: '5243', label: '5243 - Theatre, fashion, exhibit and other creative designers' },
    { value: '5244', label: '5244 - Artisans and craftspersons' },
    { value: '5245', label: '5245 - Patternmakers – textile, leather and fur products' },
    { value: '5251', label: '5251 - Athletes' },
    { value: '5252', label: '5252 - Coaches' },
    { value: '5253', label: '5253 - Sports officials and referees' },
    { value: '5254', label: '5254 - Program leaders and instructors in recreation, sport and fitness' },
    { value: '6211', label: '6211 - Retail sales supervisors' },
    { value: '6221', label: '6221 - Technical sales specialists – wholesale trade' },
    { value: '6222', label: '6222 - Retail and wholesale buyers' },
    { value: '6231', label: '6231 - Insurance agents and brokers' },
    { value: '6232', label: '6232 - Real estate agents and salespersons' },
    { value: '6235', label: '6235 - Financial sales representatives' },
    { value: '6311', label: '6311 - Food service supervisors' },
    { value: '6312', label: '6312 - Executive housekeepers' },
    { value: '6313', label: '6313 - Accommodation, travel, tourism and related services supervisors' },
    { value: '6314', label: '6314 - Customer and information services supervisors' },
    { value: '6315', label: '6315 - Cleaning supervisors' },
    { value: '6316', label: '6316 - Other services supervisors' },
    { value: '6321', label: '6321 - Chefs' },
    { value: '6322', label: '6322 - Cooks' },
    { value: '6331', label: '6331 - Butchers, meat cutters and fishmongers – retail and wholesale' },
    { value: '6332', label: '6332 - Bakers' },
    { value: '6341', label: '6341 - Hairstylists and barbers' },
    { value: '6342', label: '6342 - Tailors, dressmakers, furriers and milliners' },
    { value: '6343', label: '6343 - Shoe repairers and shoemakers' },
    { value: '6344', label: '6344 - Jewellers, jewellery and watch repairers and related occupations' },
    { value: '6345', label: '6345 - Upholsterers' },
    { value: '6346', label: '6346 - Funeral directors and embalmers' },
    { value: '6411', label: '6411 - Sales and account representatives – wholesale trade (non-technical)' },
    { value: '6421', label: '6421 - Retail salespersons' },
    { value: '6511', label: '6511 - Maîtres d’hôtel and hosts/hostesses' },
    { value: '6512', label: '6512 - Bartenders' },
    { value: '6513', label: '6513 - Food and beverage servers' },
    { value: '6521', label: '6521 - Travel counsellors' },
    { value: '6522', label: '6522 - Pursers and flight attendants' },
    { value: '6523', label: '6523 - Airline ticket and service agents' },
    { value: '6524', label: '6524 - Ground and water transport ticket agents, cargo service representatives and related clerks' },
    { value: '6525', label: '6525 - Hotel front desk clerks' },
    { value: '6531', label: '6531 - Tour and travel guides' },
    { value: '6532', label: '6532 - Outdoor sport and recreational guides' },
    { value: '6533', label: '6533 - Casino occupations' },
    { value: '6541', label: '6541 - Security guards and related security service occupations' },
    { value: '6551', label: '6551 - Customer services representatives – financial institutions' },
    { value: '6552', label: '6552 - Other customer and information services representatives' },
    { value: '6561', label: '6561 - Image, social and other personal consultants' },
    { value: '6562', label: '6562 - Estheticians, electrologists and related occupations' },
    { value: '6563', label: '6563 - Pet groomers and animal care workers' },
    { value: '6564', label: '6564 - Other personal service occupations' },
    { value: '6611', label: '6611 - Cashiers' },
    { value: '6621', label: '6621 - Service station attendants' },
    { value: '6622', label: '6622 - Store shelf stockers, clerks and order fillers' },
    { value: '6623', label: '6623 - Other sales related occupations' },
    { value: '6711', label: '6711 - Food counter attendants, kitchen helpers and related support occupations' },
    { value: '6721', label: '6721 - Support occupations in accommodation, travel and facilities set-up services' },
    { value: '6722', label: '6722 - Operators and attendants in amusement, recreation and sport' },
    { value: '6731', label: '6731 - Light duty cleaners' },
    { value: '6732', label: '6732 - Specialized cleaners' },
    { value: '6733', label: '6733 - Janitors, caretakers and building superintendents' },
    { value: '6741', label: '6741 - Dry cleaning, laundry and related occupations' },
    { value: '6742', label: '6742 - Contractors/supervisors, machining, metal forming, shaping/erecting trades & related occupations' },
    { value: '7202', label: '7202 - Contractors and supervisors, electrical trades and telecommunications occupations' },
    { value: '7203', label: '7203 - Contractors and supervisors, pipefitting trades' },
    { value: '7204', label: '7204 - Contractors and supervisors, carpentry trades' },
    { value: '7205', label: '7205 - Contractors and supervisors, other construction trades, installers, repairers and servicers' },
    { value: '7231', label: '7231 - Machinists and machining and tooling inspectors' },
    { value: '7232', label: '7232 - Tool and die makers' },
    { value: '7233', label: '7233 - Sheet metal workers' },
    { value: '7234', label: '7234 - Boilermakers' },
    { value: '7235', label: '7235 - Structural metal and platework fabricators and fitters' },
    { value: '7236', label: '7236 - Ironworkers' },
    { value: '7237', label: '7237 - Welders and related machine operators' },
    { value: '7241', label: '7241 - Electricians (except industrial and power system)' },
    { value: '7242', label: '7242 - Industrial electricians' },
    { value: '7243', label: '7243 - Power system electricians' },
    { value: '7244', label: '7244 - Electrical power line and cable workers' },
    { value: '7245', label: '7245 - Telecommunications line and cable workers' },
    { value: '7246', label: '7246 - Telecommunications installation and repair workers' },
    { value: '7247', label: '7247 - Cable television service and maintenance technicians' },
    { value: '7251', label: '7251 - Plumbers' },
    { value: '7252', label: '7252 - Steamfitters, pipefitters and sprinkler system installers' },
    { value: '7253', label: '7253 - Gas fitters' },
    { value: '7271', label: '7271 - Carpenters' },
    { value: '7272', label: '7272 - Cabinetmakers' },
    { value: '7281', label: '7281 - Bricklayers' },
    { value: '7282', label: '7282 - Concrete finishers' },
    { value: '7283', label: '7283 - Tilesetters' },
    { value: '7284', label: '7284 - Plasterers, drywall installers and finishers and lathers' },
    { value: '7291', label: '7291 - Roofers and shinglers' },
    { value: '7292', label: '7292 - Glaziers' },
    { value: '7293', label: '7293 - Insulators' },
    { value: '7294', label: '7294 - Painters and decorators (except interior decorators)' },
    { value: '7295', label: '7295 - Floor covering installers' },
    { value: '7301', label: '7301 - Contractors and supervisors, mechanic trades' },
    { value: '7302', label: '7302 - Contractors and supervisors, heavy equipment operator crews' },
    { value: '7303', label: '7303 - Supervisors, printing and related occupations' },
    { value: '7304', label: '7304 - Supervisors, railway transport operations' },
    { value: '7305', label: '7305 - Supervisors, motor transport and other ground transit operators' },
    { value: '7311', label: '7311 - Construction millwrights and industrial mechanics' },
    { value: '7312', label: '7312 - Heavy-duty equipment mechanics' },
    { value: '7313', label: '7313 - Refrigeration and air conditioning mechanics' },
    { value: '7314', label: '7314 - Railway carmen/women' },
    { value: '7315', label: '7315 - Aircraft mechanics and aircraft inspectors' },
    { value: '7316', label: '7316 - Machine fitters' },
    { value: '7318', label: '7318 - Elevator constructors and mechanics' },
    { value: '7321', label: '7321 - Automotive service technicians, truck and bus mechanics and mechanical repairers' },
    { value: '7322', label: '7322 - Motor vehicle body repairers' },
    { value: '7331', label: '7331 - Oil and solid fuel heating mechanics' },
    { value: '7332', label: '7332 - Appliance servicers and repairers' },
    { value: '7333', label: '7333 - Electrical mechanics' },
    { value: '7334', label: '7334 - Motorcycle, all-terrain vehicle and other related mechanics' },
    { value: '7335', label: '7335 - Other small engine and small equipment repairers' },
    { value: '7361', label: '7361 - Railway and yard locomotive engineers' },
    { value: '7362', label: '7362 - Railway conductors and brakemen/women' },
    { value: '7371', label: '7371 - Crane operators' },
    { value: '7372', label: '7372 - Drillers and blasters – surface mining, quarrying and construction' },
    { value: '7373', label: '7373 - Water well drillers' },
    { value: '7381', label: '7381 - Printing press operators' },
    { value: '7384', label: '7384 - Other trades and related occupations, n.e.c.' },
    { value: '7441', label: '7441 - Residential and commercial installers and servicers' },
    { value: '7442', label: '7442 - Waterworks and gas maintenance workers' },
    { value: '7444', label: '7444 - Pest controllers and fumigators' },
    { value: '7445', label: '7445 - Other repairers and servicers' },
    { value: '7451', label: '7451 - Longshore workers' },
    { value: '7452', label: '7452 - Material handlers' },
    { value: '7511', label: '7511 - Transport truck drivers' },
    { value: '7512', label: '7512 - Bus drivers, subway operators and other transit operators' },
    { value: '7513', label: '7513 - Taxi and limousine drivers and chauffeurs' },
    { value: '7514', label: '7514 - Delivery and courier service drivers' },
    { value: '7521', label: '7521 - Heavy equipment operators (except crane)' },
    { value: '7522', label: '7522 - Public works maintenance equipment operators and related workers' },
    { value: '7531', label: '7531 - Railway yard and track maintenance workers' },
    { value: '7532', label: '7532 - Water transport deck and engine room crew' },
    { value: '7533', label: '7533 - Boat and cable ferry operators and related occupations' },
    { value: '7534', label: '7534 - Air transport ramp attendants' },
    { value: '7535', label: '7535 - Other automotive mechanical installers and servicers' },
    { value: '7611', label: '7611 - Construction trades helpers and labourers' },
    { value: '7612', label: '7612 - Other trades helpers and labourers' },
    { value: '7621', label: '7621 - Public works and maintenance labourers' },
    { value: '7622', label: '7622 - Railway and motor transport labourers' },
    { value: '8211', label: '8211 - Supervisors, logging and forestry' },
    { value: '8221', label: '8221 - Supervisors, mining and quarrying' },
    { value: '8222', label: '8222 - Contractors and supervisors, oil and gas drilling and services' },
    { value: '8231', label: '8231 - Underground production and development miners' },
    { value: '8232', label: '8232 - Oil and gas well drillers, servicers, testers and related workers' },
    { value: '8241', label: '8241 - Logging machinery operators' },
    { value: '8252', label: '8252 - Agricultural service contractors, farm supervisors and specialized livestock workers' },
    { value: '8255', label: '8255 - Contractors and supervisors, landscaping, grounds maintenance and horticulture services' },
    { value: '8261', label: '8261 - Fishing masters and officers' },
    { value: '8262', label: '8262 - Fishermen/women' },
    { value: '8411', label: '8411 - Underground mine service and support workers' },
    { value: '8412', label: '8412 - Oil and gas well drilling and related workers and services operators' },
    { value: '8421', label: '8421 - Chain saw and skidder operators' },
    { value: '8422', label: '8422 - Silviculture and forestry workers' },
    { value: '8431', label: '8431 - General farm workers' },
    { value: '8432', label: '8432 - Nursery and greenhouse workers' },
    { value: '8441', label: '8441 - Fishing vessel deckhands' },
    { value: '8442', label: '8442 - Trappers and hunters' },
    { value: '8611', label: '8611 - Harvesting labourers' },
    { value: '8612', label: '8612 - Landscaping and grounds maintenance labourers' },
    { value: '8613', label: '8613 - Aquaculture and marine harvest labourers' },
    { value: '8614', label: '8614 - Mine labourers' },
    { value: '8615', label: '8615 - Oil and gas drilling, servicing and related labourers' },
    { value: '8616', label: '8616 - Logging and forestry labourers' },
    { value: '9211', label: '9211 - Supervisors, mineral and metal processing' },
    { value: '9212', label: '9212 - Supervisors, petroleum, gas and chemical processing and utilities' },
    { value: '9213', label: '9213 - Supervisors, food, beverage and associated products processing' },
    { value: '9214', label: '9214 - Supervisors, plastic and rubber products manufacturing' },
    { value: '9215', label: '9215 - Supervisors, forest products processing' },
    { value: '9217', label: '9217 - Supervisors, textile, fabric, fur and leather products processing and manufacturing' },
    { value: '9221', label: '9221 - Supervisors, motor vehicle assembling' },
    { value: '9222', label: '9222 - Supervisors, electronics manufacturing' },
    { value: '9223', label: '9223 - Supervisors, electrical products manufacturing' },
    { value: '9224', label: '9224 - Supervisors, furniture and fixtures manufacturing' },
    { value: '9226', label: '9226 - Supervisors, other mechanical and metal products manufacturing' },
    { value: '9227', label: '9227 - Supervisors, other products manufacturing and assembly' },
    { value: '9231', label: '9231 - Central control and process operators, mineral and metal processing' },
    { value: '9232', label: '9232 - Petroleum, gas and chemical process operators' },
    { value: '9235', label: '9235 - Pulping, papermaking and coating control operators' },
    { value: '9241', label: '9241 - Power engineers and power systems operators' },
    { value: '9243', label: '9243 - Water and waste treatment plant operators' },
    { value: '9411', label: '9411 - Machine operators, mineral and metal processing' },
    { value: '9412', label: '9412 - Foundry workers' },
    { value: '9413', label: '9413 - Glass forming and finishing machine operators and glass cutters' },
    { value: '9414', label: '9414 - Concrete, clay and stone forming operators' },
    { value: '9415', label: '9415 - Inspectors and testers, mineral and metal processing' },
    { value: '9416', label: '9416 - Metalworking and forging machine operators' },
    { value: '9417', label: '9417 - Machining tool operators' },
    { value: '9418', label: '9418 - Other metal products machine operators' },
    { value: '9421', label: '9421 - Chemical plant machine operators' },
    { value: '9422', label: '9422 - Plastics processing machine operators' },
    { value: '9423', label: '9423 - Rubber processing machine operators and related workers' },
    { value: '9431', label: '9431 - Sawmill machine operators' },
    { value: '9432', label: '9432 - Pulp mill machine operators' },
    { value: '9433', label: '9433 - Papermaking and finishing machine operators' },
    { value: '9434', label: '9434 - Other wood processing machine operators' },
    { value: '9435', label: '9435 - Paper converting machine operators' },
    { value: '9436', label: '9436 - Lumber graders and other wood processing inspectors and graders' },
    { value: '9437', label: '9437 - Woodworking machine operators' },
    { value: '9441', label: '9441 - Textile fibre and yarn, hide and pelt processing machine operators and workers' },
    { value: '9442', label: '9442 - Weavers, knitters and other fabric making occupations' },
    { value: '9445', label: '9445 - Fabric, fur and leather cutters' },
    { value: '9446', label: '9446 - Industrial sewing machine operators' },
    { value: '9447', label: '9447 - Inspectors and graders, textile, fabric, fur and leather products manufacturing' },
    { value: '9461', label: '9461 - Process control and machine operators, food, beverage and associated products processing' },
    { value: '9462', label: '9462 - Industrial butchers and meat cutters, poultry preparers and related workers' },
    { value: '9463', label: '9463 - Fish and seafood plant workers' },
    { value: '9465', label: '9465 - Testers and graders, food, beverage and associated products processing' },
    { value: '9471', label: '9471 - Plateless printing equipment operators' },
    { value: '9472', label: '9472 - Camera, platemaking and other prepress occupations' },
    { value: '9473', label: '9473 - Binding and finishing machine operators' },
    { value: '9474', label: '9474 - Photographic and film processors' },
    { value: '9521', label: '9521 - Aircraft assemblers and aircraft assembly inspectors' },
    { value: '9522', label: '9522 - Motor vehicle assemblers, inspectors and testers' },
    { value: '9523', label: '9523 - Electronics assemblers, fabricators, inspectors and testers' },
    { value: '9524', label: '9524 - Assemblers and inspectors, electrical appliance, apparatus and equipment manufacturing' },
    { value: '9525', label: '9525 - Assemblers, fabricators and inspectors, industrial electrical motors and transformers' },
    { value: '9526', label: '9526 - Mechanical assemblers and inspectors' },
    { value: '9527', label: '9527 - Machine operators and inspectors, electrical apparatus manufacturing' },
    { value: '9531', label: '9531 - Boat assemblers and inspectors' },
    { value: '9532', label: '9532 - Furniture and fixture assemblers and inspectors' },
    { value: '9533', label: '9533 - Other wood products assemblers and inspectors' },
    { value: '9534', label: '9534 - Furniture finishers and refinishers' },
    { value: '9535', label: '9535 - Plastic products assemblers, finishers and inspectors' },
    { value: '9536', label: '9536 - Industrial painters, coaters and metal finishing process operators' },
    { value: '9537', label: '9537 - Other products assemblers, finishers and inspectors' },
    { value: '9611', label: '9611 - Labourers in mineral and metal processing' },
    { value: '9612', label: '9612 - Labourers in metal fabrication' },
    { value: '9613', label: '9613 - Labourers in chemical products processing and utilities' },
    { value: '9614', label: '9614 - Labourers in wood, pulp and paper processing' },
    { value: '9615', label: '9615 - Labourers in rubber and plastic products manufacturing' },
    { value: '9616', label: '9616 - Labourers in textile processing' },
    { value: '9617', label: '9617 - Labourers in food, beverage and associated products processing' },
    { value: '9618', label: '9618 - Labourers in fish and seafood processing' },
    { value: '9619', label: '9619 - Other labourers in processing, manufacturing and utilities' }
]

const applicantNumbers = [
    { value: '1', label: '1' },
    { value: '2', label: '2' },
    { value: '3', label: '3' },
    { value: '4', label: '4' },
    { value: '5', label: '5' },
    { value: '6', label: '6' },
    { value: '7+', label: '7+' },
]

const BGstatuses = [
    { value: 'InProgress', label: 'InProgress' },
    { value: 'Not Applicable', label: 'Not Applicable' }
]
const streams = [
    { value: 'CIC', label: 'CIC' },
    { value: 'FSW-Inland', label: 'FSW-Inland' },
    { value: 'FSW-Outland', label: 'FSW-Outland' },
    { value: 'PNP-Inland', label: 'PNP-Inland' },
    { value: 'PNP-Outland', label: 'PNP-Outland' }
]

const statuses = [
    { value: 'Medical Passed', label: 'Medical Passed' },
    { value: 'PPR', label: 'PPR' },
    { value: 'e-APR AOR', label: 'e-APR AOR' },
    { value: 'Refused', label: 'Refused' }
]

const countries = [
    { value: 'Afghanistan ', label: 'Afghanistan ' },
    { value: 'Albania ', label: 'Albania ' },
    { value: 'Algeria ', label: 'Algeria ' },
    { value: 'American Samoa ', label: 'American Samoa ' },
    { value: 'Andorra ', label: 'Andorra ' },
    { value: 'Angola ', label: 'Angola ' },
    { value: 'Anguilla ', label: 'Anguilla ' },
    { value: 'Antigua & Barbuda ', label: 'Antigua & Barbuda ' },
    { value: 'Argentina ', label: 'Argentina ' },
    { value: 'Armenia ', label: 'Armenia ' },
    { value: 'Aruba ', label: 'Aruba ' },
    { value: 'Australia ', label: 'Australia ' },
    { value: 'Austria ', label: 'Austria ' },
    { value: 'Azerbaijan ', label: 'Azerbaijan ' },
    { value: 'Bahamas, The ', label: 'Bahamas, The ' },
    { value: 'Bahrain ', label: 'Bahrain ' },
    { value: 'Bangladesh ', label: 'Bangladesh ' },
    { value: 'Barbados ', label: 'Barbados ' },
    { value: 'Belarus ', label: 'Belarus ' },
    { value: 'Belgium ', label: 'Belgium ' },
    { value: 'Belize ', label: 'Belize ' },
    { value: 'Benin ', label: 'Benin ' },
    { value: 'Bermuda ', label: 'Bermuda ' },
    { value: 'Bhutan ', label: 'Bhutan ' },
    { value: 'Bolivia ', label: 'Bolivia ' },
    { value: 'Bosnia & Herzegovina ', label: 'Bosnia & Herzegovina ' },
    { value: 'Botswana ', label: 'Botswana ' },
    { value: 'Brazil ', label: 'Brazil ' },
    { value: 'British Virgin Is. ', label: 'British Virgin Is. ' },
    { value: 'Brunei ', label: 'Brunei ' },
    { value: 'Bulgaria ', label: 'Bulgaria ' },
    { value: 'Burkina Faso ', label: 'Burkina Faso ' },
    { value: 'Burma ', label: 'Burma ' },
    { value: 'Burundi ', label: 'Burundi ' },
    { value: 'Cambodia ', label: 'Cambodia ' },
    { value: 'Cameroon ', label: 'Cameroon ' },
    { value: 'Canada ', label: 'Canada ' },
    { value: 'Cape Verde ', label: 'Cape Verde ' },
    { value: 'Cayman Islands ', label: 'Cayman Islands ' },
    { value: 'Central African Rep. ', label: 'Central African Rep. ' },
    { value: 'Chad ', label: 'Chad ' },
    { value: 'Chile ', label: 'Chile ' },
    { value: 'China ', label: 'China ' },
    { value: 'Colombia ', label: 'Colombia ' },
    { value: 'Comoros ', label: 'Comoros ' },
    { value: 'Congo, Dem. Rep. ', label: 'Congo, Dem. Rep. ' },
    { value: 'Congo, Repub. of the ', label: 'Congo, Repub. of the ' },
    { value: 'Cook Islands ', label: 'Cook Islands ' },
    { value: 'Costa Rica ', label: 'Costa Rica ' },
    { value: 'Cote dIvoire ', label: 'Cote dIvoire ' },
    { value: 'Croatia ', label: 'Croatia ' },
    { value: 'Cuba ', label: 'Cuba ' },
    { value: 'Cyprus ', label: 'Cyprus ' },
    { value: 'Czech Republic ', label: 'Czech Republic ' },
    { value: 'Denmark ', label: 'Denmark ' },
    { value: 'Djibouti ', label: 'Djibouti ' },
    { value: 'Dominica ', label: 'Dominica ' },
    { value: 'Dominican Republic ', label: 'Dominican Republic ' },
    { value: 'East Timor ', label: 'East Timor ' },
    { value: 'Ecuador ', label: 'Ecuador ' },
    { value: 'Egypt ', label: 'Egypt ' },
    { value: 'El Salvador ', label: 'El Salvador ' },
    { value: 'Equatorial Guinea ', label: 'Equatorial Guinea ' },
    { value: 'Eritrea ', label: 'Eritrea ' },
    { value: 'Estonia ', label: 'Estonia ' },
    { value: 'Ethiopia ', label: 'Ethiopia ' },
    { value: 'Faroe Islands ', label: 'Faroe Islands ' },
    { value: 'Fiji ', label: 'Fiji ' },
    { value: 'Finland ', label: 'Finland ' },
    { value: 'France ', label: 'France ' },
    { value: 'French Guiana ', label: 'French Guiana ' },
    { value: 'French Polynesia ', label: 'French Polynesia ' },
    { value: 'Gabon ', label: 'Gabon ' },
    { value: 'Gambia, The ', label: 'Gambia, The ' },
    { value: 'Gaza Strip ', label: 'Gaza Strip ' },
    { value: 'Georgia ', label: 'Georgia ' },
    { value: 'Germany ', label: 'Germany ' },
    { value: 'Ghana ', label: 'Ghana ' },
    { value: 'Gibraltar ', label: 'Gibraltar ' },
    { value: 'Greece ', label: 'Greece ' },
    { value: 'Greenland ', label: 'Greenland ' },
    { value: 'Grenada ', label: 'Grenada ' },
    { value: 'Guadeloupe ', label: 'Guadeloupe ' },
    { value: 'Guam ', label: 'Guam ' },
    { value: 'Guatemala ', label: 'Guatemala ' },
    { value: 'Guernsey ', label: 'Guernsey ' },
    { value: 'Guinea ', label: 'Guinea ' },
    { value: 'Guinea-Bissau ', label: 'Guinea-Bissau ' },
    { value: 'Guyana ', label: 'Guyana ' },
    { value: 'Haiti ', label: 'Haiti ' },
    { value: 'Honduras ', label: 'Honduras ' },
    { value: 'Hong Kong ', label: 'Hong Kong ' },
    { value: 'Hungary ', label: 'Hungary ' },
    { value: 'Iceland ', label: 'Iceland ' },
    { value: 'India ', label: 'India ' },
    { value: 'Indonesia ', label: 'Indonesia ' },
    { value: 'Iran ', label: 'Iran ' },
    { value: 'Iraq ', label: 'Iraq ' },
    { value: 'Ireland ', label: 'Ireland ' },
    { value: 'Isle of Man ', label: 'Isle of Man ' },
    { value: 'Israel ', label: 'Israel ' },
    { value: 'Italy ', label: 'Italy ' },
    { value: 'Jamaica ', label: 'Jamaica ' },
    { value: 'Japan ', label: 'Japan ' },
    { value: 'Jersey ', label: 'Jersey ' },
    { value: 'Jordan ', label: 'Jordan ' },
    { value: 'Kazakhstan ', label: 'Kazakhstan ' },
    { value: 'Kenya ', label: 'Kenya ' },
    { value: 'Kiribati ', label: 'Kiribati ' },
    { value: 'Korea, North ', label: 'Korea, North ' },
    { value: 'Korea, South ', label: 'Korea, South ' },
    { value: 'Kuwait ', label: 'Kuwait ' },
    { value: 'Kyrgyzstan ', label: 'Kyrgyzstan ' },
    { value: 'Laos ', label: 'Laos ' },
    { value: 'Latvia ', label: 'Latvia ' },
    { value: 'Lebanon ', label: 'Lebanon ' },
    { value: 'Lesotho ', label: 'Lesotho ' },
    { value: 'Liberia ', label: 'Liberia ' },
    { value: 'Libya ', label: 'Libya ' },
    { value: 'Liechtenstein ', label: 'Liechtenstein ' },
    { value: 'Lithuania ', label: 'Lithuania ' },
    { value: 'Luxembourg ', label: 'Luxembourg ' },
    { value: 'Macau ', label: 'Macau ' },
    { value: 'Macedonia ', label: 'Macedonia ' },
    { value: 'Madagascar ', label: 'Madagascar ' },
    { value: 'Malawi ', label: 'Malawi ' },
    { value: 'Malaysia ', label: 'Malaysia ' },
    { value: 'Maldives ', label: 'Maldives ' },
    { value: 'Mali ', label: 'Mali ' },
    { value: 'Malta ', label: 'Malta ' },
    { value: 'Marshall Islands ', label: 'Marshall Islands ' },
    { value: 'Martinique ', label: 'Martinique ' },
    { value: 'Mauritania ', label: 'Mauritania ' },
    { value: 'Mauritius ', label: 'Mauritius ' },
    { value: 'Mayotte ', label: 'Mayotte ' },
    { value: 'Mexico ', label: 'Mexico ' },
    { value: 'Micronesia, Fed. St. ', label: 'Micronesia, Fed. St. ' },
    { value: 'Moldova ', label: 'Moldova ' },
    { value: 'Monaco ', label: 'Monaco ' },
    { value: 'Mongolia ', label: 'Mongolia ' },
    { value: 'Montserrat ', label: 'Montserrat ' },
    { value: 'Morocco ', label: 'Morocco ' },
    { value: 'Mozambique ', label: 'Mozambique ' },
    { value: 'Namibia ', label: 'Namibia ' },
    { value: 'Nauru ', label: 'Nauru ' },
    { value: 'Nepal ', label: 'Nepal ' },
    { value: 'Netherlands ', label: 'Netherlands ' },
    { value: 'Netherlands Antilles ', label: 'Netherlands Antilles ' },
    { value: 'New Caledonia ', label: 'New Caledonia ' },
    { value: 'New Zealand ', label: 'New Zealand ' },
    { value: 'Nicaragua ', label: 'Nicaragua ' },
    { value: 'Niger ', label: 'Niger ' },
    { value: 'Nigeria ', label: 'Nigeria ' },
    { value: 'N. Mariana Islands ', label: 'N. Mariana Islands ' },
    { value: 'Norway ', label: 'Norway ' },
    { value: 'Oman ', label: 'Oman ' },
    { value: 'Pakistan ', label: 'Pakistan ' },
    { value: 'Palau ', label: 'Palau ' },
    { value: 'Panama ', label: 'Panama ' },
    { value: 'Papua New Guinea ', label: 'Papua New Guinea ' },
    { value: 'Paraguay ', label: 'Paraguay ' },
    { value: 'Peru ', label: 'Peru ' },
    { value: 'Philippines ', label: 'Philippines ' },
    { value: 'Poland ', label: 'Poland ' },
    { value: 'Portugal ', label: 'Portugal ' },
    { value: 'Puerto Rico ', label: 'Puerto Rico ' },
    { value: 'Qatar ', label: 'Qatar ' },
    { value: 'Reunion ', label: 'Reunion ' },
    { value: 'Romania ', label: 'Romania ' },
    { value: 'Russia ', label: 'Russia ' },
    { value: 'Rwanda ', label: 'Rwanda ' },
    { value: 'Saint Helena ', label: 'Saint Helena ' },
    { value: 'Saint Kitts & Nevis ', label: 'Saint Kitts & Nevis ' },
    { value: 'Saint Lucia ', label: 'Saint Lucia ' },
    { value: 'St Pierre & Miquelon ', label: 'St Pierre & Miquelon ' },
    { value: 'Saint Vincent and the Grenadines ', label: 'Saint Vincent and the Grenadines ' },
    { value: 'Samoa ', label: 'Samoa ' },
    { value: 'San Marino ', label: 'San Marino ' },
    { value: 'Sao Tome & Principe ', label: 'Sao Tome & Principe ' },
    { value: 'Saudi Arabia ', label: 'Saudi Arabia ' },
    { value: 'Senegal ', label: 'Senegal ' },
    { value: 'Serbia ', label: 'Serbia ' },
    { value: 'Seychelles ', label: 'Seychelles ' },
    { value: 'Sierra Leone ', label: 'Sierra Leone ' },
    { value: 'Singapore ', label: 'Singapore ' },
    { value: 'Slovakia ', label: 'Slovakia ' },
    { value: 'Slovenia ', label: 'Slovenia ' },
    { value: 'Solomon Islands ', label: 'Solomon Islands ' },
    { value: 'Somalia ', label: 'Somalia ' },
    { value: 'South Africa ', label: 'South Africa ' },
    { value: 'Spain ', label: 'Spain ' },
    { value: 'Sri Lanka ', label: 'Sri Lanka ' },
    { value: 'Sudan ', label: 'Sudan ' },
    { value: 'Suriname ', label: 'Suriname ' },
    { value: 'Swaziland ', label: 'Swaziland ' },
    { value: 'Sweden ', label: 'Sweden ' },
    { value: 'Switzerland ', label: 'Switzerland ' },
    { value: 'Syria ', label: 'Syria ' },
    { value: 'Taiwan ', label: 'Taiwan ' },
    { value: 'Tajikistan ', label: 'Tajikistan ' },
    { value: 'Tanzania ', label: 'Tanzania ' },
    { value: 'Thailand ', label: 'Thailand ' },
    { value: 'Togo ', label: 'Togo ' },
    { value: 'Tonga ', label: 'Tonga ' },
    { value: 'Trinidad & Tobago ', label: 'Trinidad & Tobago ' },
    { value: 'Tunisia ', label: 'Tunisia ' },
    { value: 'Turkey ', label: 'Turkey ' },
    { value: 'Turkmenistan ', label: 'Turkmenistan ' },
    { value: 'Turks & Caicos Is ', label: 'Turks & Caicos Is ' },
    { value: 'Tuvalu ', label: 'Tuvalu ' },
    { value: 'Uganda ', label: 'Uganda ' },
    { value: 'Ukraine ', label: 'Ukraine ' },
    { value: 'United Arab Emirates ', label: 'United Arab Emirates ' },
    { value: 'United Kingdom ', label: 'United Kingdom ' },
    { value: 'United States ', label: 'United States ' },
    { value: 'Uruguay ', label: 'Uruguay ' },
    { value: 'Uzbekistan ', label: 'Uzbekistan ' },
    { value: 'Vanuatu ', label: 'Vanuatu ' },
    { value: 'Venezuela ', label: 'Venezuela ' },
    { value: 'Vietnam ', label: 'Vietnam ' },
    { value: 'Virgin Islands ', label: 'Virgin Islands ' },
    { value: 'Wallis and Futuna ', label: 'Wallis and Futuna ' },
    { value: 'West Bank ', label: 'West Bank ' },
    { value: 'Western Sahara ', label: 'Western Sahara ' },
    { value: 'Yemen ', label: 'Yemen ' },
    { value: 'Zambia ', label: 'Zambia ' },
    { value: 'Zimbabwe ', label: 'Zimbabwe ' }
]
const nationalities = [
    { value: 'Afghan', label: 'Afghan' },
    { value: 'Albanian', label: 'Albanian' },
    { value: 'Algerian', label: 'Algerian' },
    { value: 'American', label: 'American' },
    { value: 'Andorran', label: 'Andorran' },
    { value: 'Angolan', label: 'Angolan' },
    { value: 'Anguillan', label: 'Anguillan' },
    { value: 'Argentine', label: 'Argentine' },
    { value: 'Armenian', label: 'Armenian' },
    { value: 'Australian', label: 'Australian' },
    { value: 'Austrian', label: 'Austrian' },
    { value: 'Azerbaijani', label: 'Azerbaijani' },
    { value: 'Bahamian', label: 'Bahamian' },
    { value: 'Bahraini', label: 'Bahraini' },
    { value: 'Bangladeshi', label: 'Bangladeshi' },
    { value: 'Barbadian', label: 'Barbadian' },
    { value: 'Belarusian', label: 'Belarusian' },
    { value: 'Belgian', label: 'Belgian' },
    { value: 'Belizean', label: 'Belizean' },
    { value: 'Beninese', label: 'Beninese' },
    { value: 'Bermudian', label: 'Bermudian' },
    { value: 'Bhutanese', label: 'Bhutanese' },
    { value: 'Bolivian', label: 'Bolivian' },
    { value: 'Botswanan', label: 'Botswanan' },
    { value: 'Brazilian', label: 'Brazilian' },
    { value: 'British', label: 'British' },
    { value: 'British Virgin Islander', label: 'British Virgin Islander' },
    { value: 'Bruneian', label: 'Bruneian' },
    { value: 'Bulgarian', label: 'Bulgarian' },
    { value: 'Burkinan', label: 'Burkinan' },
    { value: 'Burmese', label: 'Burmese' },
    { value: 'Burundian', label: 'Burundian' },
    { value: 'Cambodian', label: 'Cambodian' },
    { value: 'Cameroonian', label: 'Cameroonian' },
    { value: 'Canadian', label: 'Canadian' },
    { value: 'Cape Verdean', label: 'Cape Verdean' },
    { value: 'Cayman Islander', label: 'Cayman Islander' },
    { value: 'Central African', label: 'Central African' },
    { value: 'Chadian', label: 'Chadian' },
    { value: 'Chilean', label: 'Chilean' },
    { value: 'Chinese', label: 'Chinese' },
    { value: 'Citizen of Antigua and Barbuda', label: 'Citizen of Antigua and Barbuda' },
    { value: 'Citizen of Bosnia and Herzegovina', label: 'Citizen of Bosnia and Herzegovina' },
    { value: 'Citizen of Guinea-Bissau', label: 'Citizen of Guinea-Bissau' },
    { value: 'Citizen of Kiribati', label: 'Citizen of Kiribati' },
    { value: 'Citizen of Seychelles', label: 'Citizen of Seychelles' },
    { value: 'Citizen of the Dominican Republic', label: 'Citizen of the Dominican Republic' },
    { value: 'Citizen of Vanuatu ', label: 'Citizen of Vanuatu ' },
    { value: 'Colombian', label: 'Colombian' },
    { value: 'Comoran', label: 'Comoran' },
    { value: 'Congolese (Congo)', label: 'Congolese (Congo)' },
    { value: 'Congolese (DRC)', label: 'Congolese (DRC)' },
    { value: 'Cook Islander', label: 'Cook Islander' },
    { value: 'Costa Rican', label: 'Costa Rican' },
    { value: 'Croatian', label: 'Croatian' },
    { value: 'Cuban', label: 'Cuban' },
    { value: 'Cymraes', label: 'Cymraes' },
    { value: 'Cymro', label: 'Cymro' },
    { value: 'Cypriot', label: 'Cypriot' },
    { value: 'Czech', label: 'Czech' },
    { value: 'Danish', label: 'Danish' },
    { value: 'Djiboutian', label: 'Djiboutian' },
    { value: 'Dominican', label: 'Dominican' },
    { value: 'Dutch', label: 'Dutch' },
    { value: 'East Timorese', label: 'East Timorese' },
    { value: 'Ecuadorean', label: 'Ecuadorean' },
    { value: 'Egyptian', label: 'Egyptian' },
    { value: 'Emirati', label: 'Emirati' },
    { value: 'English', label: 'English' },
    { value: 'Equatorial Guinean', label: 'Equatorial Guinean' },
    { value: 'Eritrean', label: 'Eritrean' },
    { value: 'Estonian', label: 'Estonian' },
    { value: 'Ethiopian', label: 'Ethiopian' },
    { value: 'Faroese', label: 'Faroese' },
    { value: 'Fijian', label: 'Fijian' },
    { value: 'Filipino', label: 'Filipino' },
    { value: 'Finnish', label: 'Finnish' },
    { value: 'French', label: 'French' },
    { value: 'Gabonese', label: 'Gabonese' },
    { value: 'Gambian', label: 'Gambian' },
    { value: 'Georgian', label: 'Georgian' },
    { value: 'German', label: 'German' },
    { value: 'Ghanaian', label: 'Ghanaian' },
    { value: 'Gibraltarian', label: 'Gibraltarian' },
    { value: 'Greek', label: 'Greek' },
    { value: 'Greenlandic', label: 'Greenlandic' },
    { value: 'Grenadian', label: 'Grenadian' },
    { value: 'Guamanian', label: 'Guamanian' },
    { value: 'Guatemalan', label: 'Guatemalan' },
    { value: 'Guinean', label: 'Guinean' },
    { value: 'Guyanese', label: 'Guyanese' },
    { value: 'Haitian', label: 'Haitian' },
    { value: 'Honduran', label: 'Honduran' },
    { value: 'Hong Konger', label: 'Hong Konger' },
    { value: 'Hungarian', label: 'Hungarian' },
    { value: 'Icelandic', label: 'Icelandic' },
    { value: 'Indian', label: 'Indian' },
    { value: 'Indonesian', label: 'Indonesian' },
    { value: 'Iranian', label: 'Iranian' },
    { value: 'Iraqi', label: 'Iraqi' },
    { value: 'Irish', label: 'Irish' },
    { value: 'Israeli', label: 'Israeli' },
    { value: 'Italian', label: 'Italian' },
    { value: 'Ivorian', label: 'Ivorian' },
    { value: 'Jamaican', label: 'Jamaican' },
    { value: 'Japanese', label: 'Japanese' },
    { value: 'Jordanian', label: 'Jordanian' },
    { value: 'Kazakh', label: 'Kazakh' },
    { value: 'Kenyan', label: 'Kenyan' },
    { value: 'Kittitian', label: 'Kittitian' },
    { value: 'Kosovan', label: 'Kosovan' },
    { value: 'Kuwaiti', label: 'Kuwaiti' },
    { value: 'Kyrgyz', label: 'Kyrgyz' },
    { value: 'Lao', label: 'Lao' },
    { value: 'Latvian', label: 'Latvian' },
    { value: 'Lebanese', label: 'Lebanese' },
    { value: 'Liberian', label: 'Liberian' },
    { value: 'Libyan', label: 'Libyan' },
    { value: 'Liechtenstein citizen', label: 'Liechtenstein citizen' },
    { value: 'Lithuanian', label: 'Lithuanian' },
    { value: 'Luxembourger', label: 'Luxembourger' },
    { value: 'Macanese', label: 'Macanese' },
    { value: 'Macedonian', label: 'Macedonian' },
    { value: 'Malagasy', label: 'Malagasy' },
    { value: 'Malawian', label: 'Malawian' },
    { value: 'Malaysian', label: 'Malaysian' },
    { value: 'Maldivian', label: 'Maldivian' },
    { value: 'Malian', label: 'Malian' },
    { value: 'Maltese', label: 'Maltese' },
    { value: 'Marshallese', label: 'Marshallese' },
    { value: 'Martiniquais', label: 'Martiniquais' },
    { value: 'Mauritanian', label: 'Mauritanian' },
    { value: 'Mauritian', label: 'Mauritian' },
    { value: 'Mexican', label: 'Mexican' },
    { value: 'Micronesian', label: 'Micronesian' },
    { value: 'Moldovan', label: 'Moldovan' },
    { value: 'Monegasque', label: 'Monegasque' },
    { value: 'Mongolian', label: 'Mongolian' },
    { value: 'Montenegrin', label: 'Montenegrin' },
    { value: 'Montserratian', label: 'Montserratian' },
    { value: 'Moroccan', label: 'Moroccan' },
    { value: 'Mosotho', label: 'Mosotho' },
    { value: 'Mozambican', label: 'Mozambican' },
    { value: 'Namibian', label: 'Namibian' },
    { value: 'Nauruan', label: 'Nauruan' },
    { value: 'Nepalese', label: 'Nepalese' },
    { value: 'New Zealander', label: 'New Zealander' },
    { value: 'Nicaraguan', label: 'Nicaraguan' },
    { value: 'Nigerian', label: 'Nigerian' },
    { value: 'Nigerien', label: 'Nigerien' },
    { value: 'Niuean', label: 'Niuean' },
    { value: 'North Korean', label: 'North Korean' },
    { value: 'Northern Irish', label: 'Northern Irish' },
    { value: 'Norwegian', label: 'Norwegian' },
    { value: 'Omani', label: 'Omani' },
    { value: 'Pakistani', label: 'Pakistani' },
    { value: 'Palauan', label: 'Palauan' },
    { value: 'Palestinian', label: 'Palestinian' },
    { value: 'Panamanian', label: 'Panamanian' },
    { value: 'Papua New Guinean', label: 'Papua New Guinean' },
    { value: 'Paraguayan', label: 'Paraguayan' },
    { value: 'Peruvian', label: 'Peruvian' },
    { value: 'Pitcairn Islander', label: 'Pitcairn Islander' },
    { value: 'Polish', label: 'Polish' },
    { value: 'Portuguese', label: 'Portuguese' },
    { value: 'Prydeinig', label: 'Prydeinig' },
    { value: 'Puerto Rican', label: 'Puerto Rican' },
    { value: 'Qatari', label: 'Qatari' },
    { value: 'Romanian', label: 'Romanian' },
    { value: 'Russian', label: 'Russian' },
    { value: 'Rwandan', label: 'Rwandan' },
    { value: 'Salvadorean', label: 'Salvadorean' },
    { value: 'Sammarinese', label: 'Sammarinese' },
    { value: 'Samoan', label: 'Samoan' },
    { value: 'Sao Tomean', label: 'Sao Tomean' },
    { value: 'Saudi Arabian', label: 'Saudi Arabian' },
    { value: 'Scottish', label: 'Scottish' },
    { value: 'Senegalese', label: 'Senegalese' },
    { value: 'Serbian', label: 'Serbian' },
    { value: 'Sierra Leonean', label: 'Sierra Leonean' },
    { value: 'Singaporean', label: 'Singaporean' },
    { value: 'Slovak', label: 'Slovak' },
    { value: 'Slovenian', label: 'Slovenian' },
    { value: 'Solomon Islander', label: 'Solomon Islander' },
    { value: 'Somali', label: 'Somali' },
    { value: 'South African', label: 'South African' },
    { value: 'South Korean', label: 'South Korean' },
    { value: 'South Sudanese', label: 'South Sudanese' },
    { value: 'Spanish', label: 'Spanish' },
    { value: 'Sri Lankan', label: 'Sri Lankan' },
    { value: 'St Helenian', label: 'St Helenian' },
    { value: 'St Lucian', label: 'St Lucian' },
    { value: 'Stateless', label: 'Stateless' },
    { value: 'Sudanese', label: 'Sudanese' },
    { value: 'Surinamese', label: 'Surinamese' },
    { value: 'Swazi', label: 'Swazi' },
    { value: 'Swedish', label: 'Swedish' },
    { value: 'Swiss', label: 'Swiss' },
    { value: 'Syrian', label: 'Syrian' },
    { value: 'Taiwanese', label: 'Taiwanese' },
    { value: 'Tajik', label: 'Tajik' },
    { value: 'Tanzanian', label: 'Tanzanian' },
    { value: 'Thai', label: 'Thai' },
    { value: 'Togolese', label: 'Togolese' },
    { value: 'Tongan', label: 'Tongan' },
    { value: 'Trinidadian', label: 'Trinidadian' },
    { value: 'Tristanian', label: 'Tristanian' },
    { value: 'Tunisian', label: 'Tunisian' },
    { value: 'Turkish', label: 'Turkish' },
    { value: 'Turkmen', label: 'Turkmen' },
    { value: 'Turks and Caicos Islander', label: 'Turks and Caicos Islander' },
    { value: 'Tuvaluan', label: 'Tuvaluan' },
    { value: 'Ugandan', label: 'Ugandan' },
    { value: 'Ukrainian', label: 'Ukrainian' },
    { value: 'Uruguayan', label: 'Uruguayan' },
    { value: 'Uzbek', label: 'Uzbek' },
    { value: 'Vatican citizen', label: 'Vatican citizen' },
    { value: 'Venezuelan', label: 'Venezuelan' },
    { value: 'Vietnamese', label: 'Vietnamese' },
    { value: 'Vincentian', label: 'Vincentian' },
    { value: 'Wallisian', label: 'Wallisian' },
    { value: 'Welsh', label: 'Welsh' },
    { value: 'Yemeni', label: 'Yemeni' },
    { value: 'Zambian', label: 'Zambian' },
    { value: 'Zimbabwean', label: 'Zimbabwean' }

]

export default class AddCase extends Component {
    constructor(props) {
        super(props)

        this.state = {
            Id: null,
            AORDate: null,
            MedicalPassedDate: null,
            BiometricsInvitationLetterDate: null,
            BGSChangeDate: null,
            PPRDate: null,
            BackgroundCheckStartedDate: null,
            EmploymentVerificationDate: null,
            AdditionalDocumentRequestDate: null,
            RPRFPaidDate: null,
            message: null,
            isLoading: false,
            visibleForm: true,
        }
    }

    getData = () => {
        const Nationality = this.state.Nationality;
        const AORDate = this.state.AORDate;
        const Country = this.state.Country;
        const ImmStream = this.state.ImmStream;
        const CurrentStatus = this.state.CurrentStatus;
        const MedicalPassedDate = this.state.MedicalPassedDate;
        const BiometricsInvitationLetterDate = this.state.BiometricsInvitationLetterDate;
        const BGCheckStatus = this.state.BGCheckStatus;
        const BGSChangeDate = this.state.BGSChangeDate;

        const PrincipalApplicantDependents = this.state.PrincipalApplicantDependents;
        const PPRDate = this.state.PPRDate;
        const NOC = this.state.NOC;
        const VisaOffice = this.state.VisaOffice;
        const AdditionalInfo = this.state.AdditionalInfo;
        const BGCheckStartDate = this.state.BGCheckStartDate;
        const EmploymentVerificationDate = this.state.EmploymentVerificationDate;
        const AdditionalDocReqDate = this.state.AdditionalDocReqDate;
        const ProvinceSponsor = this.state.ProvinceSponsor;
        const RPRFPaidDate = this.state.RPRFPaidDate;
        const CRSScore = this.state.CRSScore;
        const GCMSNotesOrdered = this.state.GCMSNotesOrdered;
        const SecurityScreening = this.state.SecurityScreening;
        const Refused = this.state.Refused;


        const data = {
            Id: this.state.Id,
            userID: this.state.userID,
            UserFirstName: this.state.firstName,
            UserLastName: this.state.lastName,
            Nationality: Nationality,
            AORDate: AORDate,
            Country: Country,
            ImmStream: ImmStream,
            CurrentStatus: CurrentStatus,
            MedicalPassedDate: MedicalPassedDate,
            BiometricsInvitationLetterDate: BiometricsInvitationLetterDate,
            BGCheckStatus: BGCheckStatus,
            BGSChangeDate: BGSChangeDate,
            PrincipalApplicantDependents: PrincipalApplicantDependents,

            PPRDate: PPRDate,
            NOC: NOC,
            VisaOffice: VisaOffice,
            AdditionalInfo: AdditionalInfo,
            BGCheckStartDate: BGCheckStartDate,
            EmploymentVerificationDate: EmploymentVerificationDate,
            AdditionalDocReqDate: AdditionalDocReqDate,
            ProvinceSponsor: ProvinceSponsor,
            RPRFPaidDate: RPRFPaidDate,
            CRSScore: CRSScore,
            GCMSNotesOrdered: GCMSNotesOrdered,
            SecurityScreening: SecurityScreening,
            Refused: Refused
        }
        return data;
    }

    addCase = () => {
        if (this.state.Nationality == null) {
            this.setState({ message: { text: 'Please enter Nationality', class: 'alert-danger' } });
            this.scrollToTop();
            return;
        }
        if (this.state.AORDate == null) {
            this.setState({ message: { text: 'Please enter AOR Date', class: 'alert-danger' } });
            this.scrollToTop();
            return;
        }
        if (this.state.Country == null) {
            this.setState({ message: { text: 'Please enter Residence Country', class: 'alert-danger' } });
            this.scrollToTop();
            return;
        }
        if (this.state.CurrentStatus == null) {
            this.setState({ message: { text: 'Please enter Current Status', class: 'alert-danger' } });
            this.scrollToTop();
            return;
        }


        this.setState({ isLoading: true })
        const data = this.getData();
        if (this.state.Id == null)

            axios.post('http://localhost:3000/api/cases/', data)
                .then((response) => {
                    //console.log(response);
                    this.setState({
                        message: { text: 'Case successfully saved', class: 'alert-primary' },
                        class: 'primary',
                        isLoading: false,
                        visibleForm: false,
                    })
                })
                .catch((error) => {
                    console.log(error);
                    this.setState({
                        message: { text: 'error', class: 'alert-danger' },
                        isLoading: false
                    })
                    this.scrollToTop();
                });
        else
            axios.put('http://localhost:3000/api/cases/', data)
                .then((response) => {
                    //console.log(response);
                    this.setState({
                        message: { text: 'Case successfully saved', class: 'alert-primary' },
                        isLoading: false,
                        visibleForm: false,
                    })
                })
                .catch((error) => {
                    //console.log(error);
                    this.setState({
                        message: { text: error, class: 'alert-danger' },
                        isLoading: false
                    })
                });

    }

    handleAORDateChange = date => {
        this.setState({ AORDate: date });
    };
    handleMedicalPassedDateChange = date => {
        this.setState({ MedicalPassedDate: date });
    };
    handleBiometricsInvitationLetterDateChange = date => {
        this.setState({ BiometricsInvitationLetterDate: date });
    };
    handleBGSChangeDateChange = date => {
        this.setState({ BGSChangeDate: date });
    };
    handlePPRDateChange = date => {
        this.setState({ PPRDate: date });
    };
    handleBGCheckStartDateChange = date => {
        this.setState({ BGCheckStartDate: date });
    };
    handleEmploymentVerificationDateChange = date => {
        this.setState({ EmploymentVerificationDate: date });
    };
    handleAdditionalDocReqDateChange = date => {
        this.setState({ AdditionalDocReqDate: date });
    };
    handleRPRFPaidDateChange = date => {
        this.setState({ RPRFPaidDate: date });
    };




    handleNationalities = (event) => {
        this.setState({ Nationality: event.value })
    }
    handleCountries = (event) => {
        this.setState({ Country: event.value })
    }
    handleStream = (event) => {
        this.setState({ ImmStream: event.value })
    }
    handleCurrentStatus = (event) => {
        this.setState({ CurrentStatus: event.value })
    }
    handleBGStatus = (event) => {
        this.setState({ BGCheckStatus: event.value })
    }

    handlePrincipalApplicantDependents = (event) => {
        this.setState({ PrincipalApplicantDependents: event.value })
    }
    handleNOC = (event) => {
        this.setState({ NOC: event.value })
    }
    handleVisaOffice = (event) => {
        this.setState({ VisaOffice: event.value })
    }
    handleProvinceSponsor = (event) => {
        this.setState({ ProvinceSponsor: event.value })
    }

    handleAdditionalInfo = (event) => {
        this.setState({ AdditionalInfo: event.target.value })
    }
    handleCRSScore = (event) => {
        this.setState({ CRSScore: event.target.value })
    }

    handleGCMSOrderChange = (event) => {
        this.setState({ GCMSNotesOrdered: event.target.checked })
    }
    handleSecurityScreeningChange = (event) => {
        this.setState({ SecurityScreening: event.target.checked })
    }
    handleRefusedChange = (event) => {
        this.setState({ Refused: event.target.checked })
    }
    componentWillReceiveProps() {
        console.log('aaaaaaaaaaaa');

    }

    loadData = (id) => {
        const url = 'http://localhost:3000/api/cases/' + id
        console.log(url);

        fetch(url)
            .then(response => response.json())
            .then(response => {
                console.log(response.BGCheckStartDate);
                var AORDate = response.AORDate;
                var MedicalPassedDate = response.MedicalPassedDate;
                var BiometricsInvitationLetterDate = response.BiometricsInvitationLetterDate;
                var BGSChangeDate = response.BGSChangeDate;

                var PPRDate = response.PPRDate;
                var BGCheckStartDate = response.BGCheckStartDate;
                var EmploymentVerificationDate = response.EmploymentVerificationDate;
                var AdditionalDocReqDate = response.AdditionalDocReqDate;
                var RPRFPaidDate = response.RPRFPaidDate;


                AORDate = AORDate != undefined ? new Date(AORDate.substring(0, 10)) : null;
                MedicalPassedDate = MedicalPassedDate != undefined ? new Date(MedicalPassedDate.substring(0, 10)) : null;
                BiometricsInvitationLetterDate = BiometricsInvitationLetterDate != undefined ? new Date(BiometricsInvitationLetterDate.substring(0, 10)) : null;
                BGSChangeDate = BGSChangeDate != undefined ? new Date(BGSChangeDate.substring(0, 10)) : null;
                PPRDate = PPRDate != undefined ? new Date(PPRDate.substring(0, 10)) : null;
                BGCheckStartDate = BGCheckStartDate != undefined ? new Date(BGCheckStartDate.substring(0, 10)) : null;
                EmploymentVerificationDate = EmploymentVerificationDate != undefined ? new Date(EmploymentVerificationDate.substring(0, 10)) : null;
                RPRFPaidDate = RPRFPaidDate != undefined ? new Date(RPRFPaidDate.substring(0, 10)) : null;
                AdditionalDocReqDate = AdditionalDocReqDate != undefined ? new Date(AdditionalDocReqDate.substring(0, 10)) : null;


                //console.log('stream=' + response.Stream);

                this.setState({
                    Nationality: response.Nationality,
                    AORDate: AORDate,
                    Country: response.Country,
                    ImmStream: response.ImmStream,
                    CurrentStatus: response.CurrentStatus,
                    MedicalPassedDate: MedicalPassedDate,
                    BiometricsInvitationLetterDate: BiometricsInvitationLetterDate,
                    BGCheckStatus: response.BGCheckStatus,
                    BGSChangeDate: BGSChangeDate,

                    PrincipalApplicantDependents: response.PrincipalApplicantDependents,
                    PPRDate: PPRDate,
                    NOC: response.NOC,
                    VisaOffice: response.VisaOffice,
                    AdditionalInfo: response.AdditionalInfo,
                    BGCheckStartDate: BGCheckStartDate,
                    EmploymentVerificationDate: EmploymentVerificationDate,
                    AdditionalDocReqDate: AdditionalDocReqDate,
                    ProvinceSponsor: response.ProvinceSponsor,
                    RPRFPaidDate: RPRFPaidDate,
                    CRSScore: response.CRSScore,
                    GCMSNotesOrdered: response.GCMSNotesOrdered,
                    SecurityScreening: response.SecurityScreening,
                    Refused: response.Refused,

                })
            }
            );

    }

    gotoMyCases = () => {
        const { match, location, history } = this.props;
        history.push({
            pathname: '/mycases',
            userData: this.props.userData,
        })
    }

    componentWillUnmount() {
        Events.scrollEvent.remove('begin');
        Events.scrollEvent.remove('end');
    }
    scrollToTop() {
        scroll.scrollToTop();
    }
    scrollToBottom() {
        scroll.scrollToBottom();
    }

    componentDidMount() {

        Events.scrollEvent.register('begin', function (to, element) {
            //console.log("begin", arguments);
        });

        Events.scrollEvent.register('end', function (to, element) {
            //console.log("end", arguments);
        });

        scrollSpy.update();

        //console.log('id=' + this.props.location.id);
        //this.props.setUserID(response.data._id)

        if (this.props.userData == null) {
            const { match, location, history } = this.props;
            history.push('/login')
        }
        else {
            this.setState({
                userID: this.props.userData.userID,
                Id: this.props.location.id,
                firstName: this.props.userData.firstName,
                lastName: this.props.userData.lastName,
            })
            if (this.props.location.id != undefined) {
                this.loadData(this.props.location.id)
            }
        }
    }

    render() {
        return (
            <div className="m-2">
                {this.state.message != null ?
                    <div className={"alert " + this.state.message.class + " mt-1"} >
                        {this.state.message.text}
                    </div>
                    : null}

                {this.state.visibleForm ?
                    <div>
                        <h1 className="form-header">My Case</h1>
                        <div className="AddCase">

                            <div className="form-group row">
                                <label htmlFor="staticNationality" className="col-sm-3 col-form-label required">Nationality</label>
                                <div className="col-sm-9">
                                    <Select className="dropdownContainer" required onChange={this.handleNationalities} value={nationalities.filter(option => option.label === this.state.Nationality)} options={nationalities} />
                                </div>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="staticEmail" className="col-sm-3 col-form-label required">e-APR AOR Date</label>
                                <div className="col-sm-9 text-left">
                                    <DatePicker
                                        selected={this.state.AORDate}
                                        onChange={this.handleAORDateChange}
                                    />
                                    <FontAwesomeIcon className="ml-2 calendar" icon={faCalendarAlt} />
                                </div>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="staticNationality" className="col-sm-3 col-form-label required">Country of Residence</label>
                                <div className="col-sm-9 ">
                                    <Select className="dropdownContainer" onChange={this.handleCountries} options={countries} value={countries.filter(option => option.label === this.state.Country)} />
                                </div>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="staticNationality" className="col-sm-3 col-form-label">Stream</label>
                                <div className="col-sm-9">
                                    <Select className="dropdownContainer" onChange={this.handleStream} options={streams} value={streams.filter(option => option.label === this.state.ImmStream)} />
                                </div>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="staticNationality" className="col-sm-3 col-form-label required">Current Status</label>
                                <div className="col-sm-9">
                                    <Select className="dropdownContainer" onChange={this.handleCurrentStatus} options={statuses} value={statuses.filter(option => option.label === this.state.CurrentStatus)} />
                                </div>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="staticEmail" className="col-sm-3 col-form-label">Date Medical Passed</label>
                                <div className="col-sm-9 text-left">
                                    <DatePicker
                                        selected={this.state.MedicalPassedDate}
                                        onChange={this.handleMedicalPassedDateChange}
                                    />
                                    <FontAwesomeIcon className="ml-2 calendar" icon={faCalendarAlt} />
                                </div>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="staticEmail" className="col-sm-3 col-form-label">Biometrics Invitation Letter</label>
                                <div className="col-sm-9 text-left">
                                    <DatePicker
                                        selected={this.state.BiometricsInvitationLetterDate}
                                        onChange={this.handleBiometricsInvitationLetterDateChange}
                                    />
                                    <FontAwesomeIcon className="ml-2 calendar" icon={faCalendarAlt} />
                                </div>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="staticNationality" className="col-sm-3 col-form-label">Background Check Status</label>
                                <div className="col-sm-9">
                                    <Select className="dropdownContainer" onChange={this.handleBGStatus} options={BGstatuses} value={BGstatuses.filter(option => option.label === this.state.BGCheckStatus)} />
                                </div>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="staticEmail" className="col-sm-3 col-form-label">Last BGS change Date</label>
                                <div className="col-sm-9 text-left">
                                    <DatePicker
                                        selected={this.state.BGSChangeDate}
                                        onChange={this.handleBGSChangeDateChange}
                                    />
                                    <FontAwesomeIcon className="ml-2 calendar" icon={faCalendarAlt} />
                                </div>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="staticNationality" className="col-sm-3 col-form-label">Principal applicant + dependents</label>
                                <div className="col-sm-9">
                                    <Select className="dropdownContainer" onChange={this.handlePrincipalApplicantDependents} options={applicantNumbers} value={applicantNumbers.filter(option => option.label === this.state.PrincipalApplicantDependents)} />
                                </div>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="staticEmail" className="col-sm-3 col-form-label">PPR Date</label>
                                <div className="col-sm-9 text-left">
                                    <DatePicker
                                        selected={this.state.PPRDate}
                                        onChange={this.handlePPRDateChange}
                                    />
                                    <FontAwesomeIcon className="ml-2 calendar" icon={faCalendarAlt} />
                                </div>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="staticNationality" className="col-sm-3 col-form-label">NOC</label>
                                <div className="col-sm-9">
                                    <Select className="dropdownContainer" onChange={this.handleNOC} options={NOCList} value={NOCList.filter(option => option.value === this.state.NOC)} />
                                </div>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="staticNationality" className="col-sm-3 col-form-label">Visa Office</label>
                                <div className="col-sm-9">
                                    <Select className="dropdownContainer" onChange={this.handleVisaOffice} options={visaOfficeList} value={visaOfficeList.filter(option => option.label === this.state.VisaOffice)} />
                                </div>
                            </div>


                            <div className="form-group row">
                                <label htmlFor="staticAdditionalInfo" className="col-sm-3 col-form-label">Additional Info</label>
                                <div className="col-sm-9">
                                    <input type="text" onChange={(e) => this.handleAdditionalInfo(e)} className="form-control" id="staticAdditionalInfo" />
                                </div>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="staticBGStartDate" className="col-sm-3 col-form-label">Date Background check started</label>
                                <div className="col-sm-9 text-left">
                                    <DatePicker
                                        selected={this.state.BGCheckStartDate}
                                        onChange={this.handleBGCheckStartDateChange}
                                    />
                                    <FontAwesomeIcon className="ml-2 calendar" icon={faCalendarAlt} />
                                </div>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="staticBGStartDate" className="col-sm-3 col-form-label">Employment Verification date</label>
                                <div className="col-sm-9 text-left">
                                    <DatePicker
                                        selected={this.state.EmploymentVerificationDate}
                                        onChange={this.handleEmploymentVerificationDateChange}
                                    />
                                    <FontAwesomeIcon className="ml-2 calendar" icon={faCalendarAlt} />
                                </div>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="staticBGStartDate" className="col-sm-3 col-form-label">Additional Document Request Date</label>
                                <div className="col-sm-9 text-left">
                                    <DatePicker
                                        selected={this.state.AdditionalDocReqDate}
                                        onChange={this.handleAdditionalDocReqDateChange}
                                    />
                                    <FontAwesomeIcon className="ml-2 calendar" icon={faCalendarAlt} />
                                </div>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="staticNationality" className="col-sm-3 col-form-label">Sponsored by Province (if PNP)</label>
                                <div className="col-sm-9">
                                    <Select className="dropdownContainer" onChange={this.handleProvinceSponsor} options={provinceList} value={provinceList.filter(option => option.label === this.state.ProvinceSponsor)} />
                                </div>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="staticBGStartDate" className="col-sm-3 col-form-label">RPRF paid date</label>
                                <div className="col-sm-9 text-left">
                                    <DatePicker
                                        selected={this.state.RPRFPaidDate}
                                        onChange={this.handleRPRFPaidDateChange}
                                    />
                                    <FontAwesomeIcon className="ml-2 calendar" icon={faCalendarAlt} />
                                </div>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="CRSScore" className="col-sm-3 col-form-label">CRS Score</label>
                                <div className="col-sm-9">
                                    <input type="text" onChange={(e) => this.handleCRSScore(e)} className="form-control" id="CRSScore" />
                                </div>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="staticNationality" className="col-sm-3 col-form-label">GCMS Notes ordered (if any)</label>
                                <div className="col-sm-9 text-left">
                                    <Checkbox
                                        checked={this.state.GCMSNotesOrdered}
                                        onChange={this.handleGCMSOrderChange}
                                    />
                                </div>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="staticNationality" className="col-sm-3 col-form-label">Security Screening</label>
                                <div className="col-sm-9 text-left">
                                    <Checkbox
                                        checked={this.state.SecurityScreening}
                                        onChange={this.handleSecurityScreeningChange}
                                    />
                                </div>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="staticNationality" className="col-sm-3 col-form-label">Refused</label>
                                <div className="col-sm-9 text-left">
                                    <Checkbox
                                        checked={this.state.Refused}
                                        onChange={this.handleRefusedChange}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    : null}
                <button className="btn btn-info mr-2" onClick={this.gotoMyCases} >Back to My Cases</button>
                {this.state.isLoading ?
                    <div className="spinner-border" role="status"><span className="sr-only">Loading...</span></div>
                    :
                    <button className="btn btn-primary" onClick={this.addCase} >Submit</button>
                }

            </div>
        )
    }
}
