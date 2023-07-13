import http from '../interceptor';

export const registerRequest = (data) => http.post('registration', data);
export const loginRequest = (data) => http.post('login', data);
export const getUser = () => http.get('getUser');
export const updateContest = (data) => http.put('updateContest', data);
export const setNewOffer = (data) => http.post('setNewOffer', data);
export const setOfferStatus = (data) => http.put('setOfferStatus', data);
export const downloadContestFile = (data) => http.get(`downloadFile/${data.fileName}`);
export const payMent = (data) => http.post('pay', data.formData);
export const changeMark = (data) => http.put('changeMark', data);
export const getPreviewChat = () => http.get('getPreview');
export const getDialog = (data) => http.get('getChat', data);
export const dataForContest = (data) => http.post('dataForContest', data);
export const cashOut = (data) => http.post('cashout', data);
export const updateUser = (data) => http.put('updateUser', data);
export const newMessage = (data) => http.post('newMessage', data);
export const changeChatFavorite = (data) => http.put('favorite', data);
export const changeChatBlock = (data) => http.put('blackList', data);
export const getCatalogList = (data) => http.post('getCatalogs', data);
export const addChatToCatalog = (data) => http.post('addNewChatToCatalog', data);
export const createCatalog = (data) => http.post('createCatalog', data);
export const deleteCatalog = (data) => http.delete('deleteCatalog', data);
export const removeChatFromCatalog = (data) => http.delete('removeChatFromCatalog', data);
export const changeCatalogName = (data) => http.put('updateNameCatalog', data);
export const getCustomersContests = ({limit, offset, contestStatus}) => http.get(`getCustomersContests/${limit}/${offset}`, {
  headers: {
    status: contestStatus,
  },
});


export const getActiveContests = ({
  offset, limit, typeIndex, contestId, industry, awardSort, ownEntries,
}) => http.post(`getAllContests/${limit}/${offset}`,
{
  offset, limit, typeIndex, contestId, industry, awardSort, ownEntries,
});

export const getContestById = (data) => http.get('getContestById', {
  headers: {
    contestId: data.contestId,
  },
});
