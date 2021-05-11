export const API_URL = 'https://vpic.nhtsa.dot.gov/api/';
export const ALL_MANUFACTURES = `${API_URL}vehicles/GetAllManufacturers?ManufacturerType?ManufacturerType=Intermediate&format=json`;
export const ALL_MAKES = `${API_URL}vehicles/GetMakeForManufacturer/`;

export const VIEW_DETAILS = 'View Details';
export const COLUMNS = ['ID', 'Common Name', 'Country'];
export const DETAIL_PATH = '/details';
