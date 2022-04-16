import { IMAGE_CHANGE } from '../constants';

const initialState = {
    'collections': '',
    'comments': '',
    'downloads': '',
    'id': '',
    'imageHeight': '',
    'imageSize': '',
    'imageWidth': '',
    'largeImageURL': '',
    'likes': '',
    'pageURL': '',
    'previewHeight': '',
    'previewURL': '',
    'previewWidth': '',
    'tags': '',
    'type': '',
    'user': '',
    'userImageURL': '',
    'user_id': '',
    'views': '',
    'webformatHeight': '',
    'webformatURL': '',
    'webformatWidth': '',
};

const imageReducer = (state = initialState, action) => {
    switch(action.type) {
        case IMAGE_CHANGE:
            return action.payload;
        default:
            return state;
    }
}
export default imageReducer;