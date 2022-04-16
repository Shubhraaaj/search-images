import { IMAGE_CHANGE } from '../constants';

export function changeCount(image) {
    return {
        type: IMAGE_CHANGE,
        payload: image
    }
}