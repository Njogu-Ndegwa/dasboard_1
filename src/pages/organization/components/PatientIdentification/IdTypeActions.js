import api from "../../../../config/api";

const {BASE_URL, TOKEN} = api;

class IdTypeActions {
    createIdType(obj) {
        return fetch(BASE_URL + "api/patient_identification_type", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${TOKEN}`
            },
            body: JSON.stringify(obj)
        })
            .then(response => response.json()).catch(error => {
                return error;
            });

    }

    fetchIdType() {
        if (TOKEN) {
            return fetch(BASE_URL + "api/patient_identification_type", {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    Authorization: `Bearer ${TOKEN}`
                }
            })
                .then(resp => resp.json())
                .then(response => {
                    return response;
                });
        }
    }
}

export default new IdTypeActions();
