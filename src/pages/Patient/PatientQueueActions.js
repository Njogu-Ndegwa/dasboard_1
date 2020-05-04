import api from "../../config/api";

const {BASE_URL, TOKEN} = api;

class PatientQueueAction {
    fetchQueueByDepartment(deptId) {
        if (TOKEN) {
            return fetch(BASE_URL + `api/department/${deptId}/queue`, {
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

    fetchAllPatientQue() {
        if (TOKEN) {
            return fetch(BASE_URL + `api/queue`, {
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

export default new PatientQueueAction();
