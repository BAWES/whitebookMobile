import { Component } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';

@Component({
  selector: 'select-search-page',
  templateUrl: 'select-search-page.html'
})
export class SelectSearchPage {
  public searchInput: string = "";

  public collection: any[];
  public labelAttr: string;
  public labelAttrAr: string;

  // The collection data being presented to user
  public displayedCollection: any[]; 

  constructor(
    params: NavParams,
    private _viewCtrl: ViewController
  ) {
    console.log(this.labelAttr);
    this.collection = params.get("collection");
    this.labelAttr = params.get("labelAttr");
    this.labelAttrAr = params.get("labelAttrAr");
    this.displayedCollection = this.collection.slice();
  }

  ionViewDidLoad() {
    
  }

  /**
   * When an item is selected from list
   */
  onSelect(selectedItem){
    this._viewCtrl.dismiss(selectedItem);
  }

  /**
   * Display search results based on user input
   */
  searchFilter($event){
    let searchInput = this.searchInput.toLowerCase();

    if(searchInput){
      this.displayedCollection = this.collection.filter((collectionItem) => {
        //if(this.translateService.currentLang != 'ar')
          return collectionItem[this.labelAttr].toLowerCase().indexOf(searchInput) >= 0;
        //else 
        //  return collectionItem[this.labelAttrAr].toLowerCase().indexOf(searchInput) >= 0;
      });
    }else{
      this.displayedCollection = this.collection.slice();
    }
  }


}
