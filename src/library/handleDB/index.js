export class DB {
  BASE_URL = 'http://localhost:3000';
  endPoint;
  requestHeader;

  constructor(endPoint = 'tasks') {
    this.endPoint = endPoint;
  }

  getBaseUrl() {
    return this.BASE_URL;
  }
  setBaseUrl(BaseUrl) {
    this.BASE_URL = BaseUrl;
  }
  getEndPoint() {
    return this.endPoint;
  }
  setEndPoint(endPoint) {
    this.endPoint = endPoint;
  }

  async getDB() {
    try {
      let response = await fetch(this.BASE_URL + '/' + this.endPoint);
      this.requestHeader = response.headers;
      console.log(response.headers.get('X-Total-Count'));
      response = await response.json();
      return response;
    } catch (error) {
      console.log(error);
    }
  }
  async getItem(id) {
    try {
      let response = await fetch(
        this.BASE_URL + '/' + this.endPoint + `${id ? '/' + id : ''}`
      );
      response = await response.json();
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async addItem(item) {
    try {
      let response = await fetch(this.BASE_URL + '/' + this.endPoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item),
      });
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async deleteItem(id) {
    try {
      let response = await fetch(this.BASE_URL + '/tasks' + `/${id}`, {
        method: 'DELETE',
      });
      return response;
    } catch (error) {
      console.log(error);
    }
  }
  async updateItem(id, item) {
    try {
      await fetch(this.BASE_URL + '/tasks' + `/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item),
      });
    } catch (error) {
      console.log(error);
    }
  }
}
