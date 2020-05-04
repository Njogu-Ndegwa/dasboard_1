import api from '../../../../config/api';
const { BASE_URL, TOKEN } = api

class DepartmentActions {
  fetchDepartmentsByFacility(facilityId) {
    if (TOKEN) {
      return fetch(
        BASE_URL + "api/facility/" + facilityId + "/department",
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${TOKEN}`
          }
        }
      )
        .then(resp => resp.json())
        .then(response => {
          return response;
        });
    }
  }
}

export default new DepartmentActions();
