import { DateTime } from 'luxon';

export const getCurrentDate = () => {
    const israelDateStr = DateTime.now().setZone('Asia/Jerusalem').toISODate();
    return israelDateStr!;
};
