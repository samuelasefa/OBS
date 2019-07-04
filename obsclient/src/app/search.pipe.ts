import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchbids'
})
export class SearchPipe  implements PipeTransform {

  transform(bids: any, searchText: any): any {
    if (searchText == null) {
      return bids;
    }
    // tslint:disable-next-line:only-arrow-functions
    return bids.filter( function(bid) {
      return (
        bid.bid_name.toLowerCase().indexOf(searchText.toLowerCase()) >
          -1 ||
        bid.bid_postdate.toLowerCase().indexOf(searchText.toLowerCase()) > -1 ||
        bid.bid_deadline.toLowerCase().indexOf(searchText.toLowerCase()) > -1
      );
    });
  }

}
