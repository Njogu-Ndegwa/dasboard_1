import api from "../../../config/api";

const {BASE_URL, TOKEN} = api;

class PatientAction {
    createPatient(obj) {
        return fetch(BASE_URL + "api/patients", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${TOKEN}`
            },
            body: JSON.stringify(obj)
        })
            .then(response => {
                return response.json();
            })
            .catch(error => {
                return error;
            });
    }

    fetchPatientsData() {
        if (TOKEN) {
            return fetch(BASE_URL + "api/patients", {
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

export default new PatientAction();
