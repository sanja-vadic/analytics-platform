export class Request {
   constructor(view, requestParts, payload) {
      this.view = view;
      this.requestParts = requestParts;
      this.payload = payload;
   }

   toString() {
      const requestTemplate = `
      {
         "view": "${this.view}",
         "requests": "${this.requestParts}",
         "payload": "${this.payload}"
      }
      `;
      return requestTemplate;
   }
}
