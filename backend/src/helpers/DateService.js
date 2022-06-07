class DateService {
    now() {
        return new Date().getTime();
    }
}

export default new DateService();