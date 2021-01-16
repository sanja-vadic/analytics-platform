export class RequestPart {
   constructor(part, dateStart, dateEnd, dimensions, metrics, sorts) {
      this.part = part;
      this.dateStart = dateStart;
      this.dateEnd = dateEnd;
      this.dimensions = dimensions;
      this.metrics = metrics;
      this.sorts = sorts;
   }

   toString() {
      const requestTemplate = `
      {
         "part": "${this.part}",
         "request": {
         "date": {
            "from": "${this.dateStart}",
            "to": "${this.dateEnd}"
         },
         "dimensions": ${this.dimensions},
         "metrics": ${this.metrics},
         "sorts": ${this.sorts}
         }
      }
      `;
      return requestTemplate;
   }
}
