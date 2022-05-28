class ResponseUtil {

    /**
     * 
     * @param {any} data 
     * @param {number} code 
     */
    static responseWithData(data, code = 200) {

        return {
            data,
            code
        }
    }
}

export default ResponseUtil;