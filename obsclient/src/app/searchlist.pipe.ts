import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: "searchlist"
})
export class SearchlistPipe implements PipeTransform {
  transform(users: any, searchText: any): any {
    if (searchText == null) {
      return users;
    }
    // tslint:disable-next-line:only-arrow-functions
    return users.filter(function(user) {
      return (
        user.companyName.indexOf(searchText.toLowerCase()) > -1 ||
        user.username.indexOf(searchText.toLowerCase()) > -1 ||
        user.tinNumber.indexOf(searchText.toLowerCase()) > -1 ||
        user.email.indexOf(searchText.toLowerCase()) > -1 ||
        user.phoneNumber.indexOf(searchText.toLowerCase()) > -1
      );
    });
  }
}
