import { Request } from "./Request";

export class RequestBuilder {
   constructor(view) {
      this.view = view;
      this.requestParts = [];
      this.payload = []; // array of {key: "key", value: "value"}
   }

   withView(view) {
      this.view = view;
      return this;
   }

   withRequestPart(requestPart) {
      this.requestParts.push(requestPart);
      return this;
   }

   withPayloadItem(payloadItem) {
      this.payload.push(payloadItem);
      return this;
   }

   build() {
      return new Request(this.view, this.requestParts);
   }
}
