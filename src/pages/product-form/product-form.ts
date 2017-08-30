import { Component } from '@angular/core';
import { NavParams, ViewController, AlertController, ToastController } from 'ionic-angular';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';

// Services 
import { TranslateService } from '@ngx-translate/core';
import { CartService } from '../../providers/cart.service';
import { ProductService } from '../../providers/product.service';
import { GlobalService } from '../../providers/global.service';

@Component({
  selector: 'product-form',
  templateUrl: 'product-form.html'
})
export class ProductFormPage {
    
    public product;
    public vendorAreaList: any;
    public timeslots: any = [];
    public quantity: number = 1;
    public maxQuantity: number = 0;
    public minQuantity: number = 1;
    public dateChange: boolean = false;
    
    //form variables
    public productForm: FormGroup;
    public submitAttempt: boolean = false;
    public menuRange: any = [];  
    public total: number = 0;  
    public cartErrors: any = [];

    public currentTime;
    public todayStr;
    public todayDate;
    public maxDate;

    constructor(
        public navParams: NavParams,
        public viewCtrl : ViewController,
        public cartService: CartService,
        public productService: ProductService,
        public formBuilder: FormBuilder,
        public toastCtrl: ToastController,
        public alertCtrl: AlertController,
        public translateService: TranslateService,
        public _config: GlobalService
    ){
        this.product = this.navParams.get('product');
       
        if (this.product.item.item_minimum_quantity_to_order > 0) {
           this.minQuantity = this.product.item.item_minimum_quantity_to_order;
        }
  
        if (this.product.item.included_quantity > this.minQuantity) {
           this.minQuantity = this.product.item.included_quantity;
        }
  
        this.quantity = this.minQuantity;          
  
        this.currentTime = new Date().getTime();    
    }

    ionViewWillEnter() {
        this.loadProductArea(this.product.vendor.vendor_id);
        this.intiateForm();
    }

    intiateForm() {
    
        let formControls: any = {};

        this.product.menu.forEach((value, index) => {
            value.vendorItemMenuItems.forEach((menu_item, index) => {
                formControls['menu_item[' + menu_item.menu_item_id + ']'] = [
                    menu_item.quantity_type == 'checkbox'? 1 : 0, []
                ];
            });
        });

        this.product.addons.forEach((value, index) => {
            value.vendorItemMenuItems.forEach((menu_item, index) => {
                formControls['menu_item[' + menu_item.menu_item_id + ']'] = [
                    menu_item.quantity_type == 'checkbox'? 1 : 0, []
                ];
            });
        });

        formControls['item_id'] = [this.product.item.item_id, Validators.required];
        formControls['quantity'] = [this.quantity, Validators.required];
        formControls['area_id'] = ['', Validators.required];
        formControls['delivery_date'] = ['', Validators.required];
        formControls['time_slot'] = ['', Validators.required];
        formControls['female_service'] = [''];
        formControls['special_request'] = [''];
    
        this.productForm = this.formBuilder.group(formControls);

        this.setDates();    
        this.loadFinalPrice();        
    }

    loadFinalPrice() {
        let params = this.productForm.value;
        this.productService.loadFinalPrice(params).subscribe(jsonResponse => {
            this.total = jsonResponse.total;
        });
    }

    /**
     * method to load product area
    */
    loadProductArea(vendor_id) {
        this.productService.loadProductArea(vendor_id).subscribe(result => {
            this.vendorAreaList = result;
        });
    }

    /**
     * method to load time slot 
     * for perticular vendor product
     */
    loadTimeSlot(vendor_id) {
        this.dateChange = true;
        this.productService.loadTimeSlot(
            vendor_id, 
            this.productForm.controls['delivery_date'].value, 
            this.currentTime, 
            this.todayStr
        ).subscribe(timeslots => {
            this.timeslots = timeslots;
            this.loadProductCapacity(); // loading product capacity
        });
    }

    /**
     *  method to increase quantity
     */
    add() {
        /*if (this.maxQuantity == 0) {
            this.translateService.get('Please select delivery date').subscribe(value => {
                let toast = this.toastCtrl.create({
                    message: value,
                    duration: 2000
                });
                toast.present();
            });            
            return false;
        }

        if (this.quantity < this.maxQuantity) {
            this.quantity++;
            this.productForm.controls['quantity'].setValue(this.quantity);
            this.loadFinalPrice();
        } else {
            this.translateService.get('Max Quantity Available is {{value}}', { value: this.maxQuantity}).subscribe(value => {
                let toast = this.toastCtrl.create({
                    message: value,
                    duration: 2000
                });
                toast.present();
            });            
            return false;
        }*/
        this.quantity++;
        this.productForm.controls['quantity'].setValue(this.quantity);
        this.loadFinalPrice();
    }

    /**
     *  method to decrease quantity
     */
    sub() {
        /*if (this.maxQuantity == 0) {
            let toast = this.toastCtrl.create({
                message: 'Please select delivery date',
                duration: 2000
            });
            toast.present();
        } else {
            if (this.quantity > this.minQuantity) {
                this.quantity--;
                this.productForm.controls['quantity'].setValue(this.quantity);
                this.loadFinalPrice();
            }
        }*/

        if (this.quantity > this.minQuantity) {
            this.quantity--;
            this.productForm.controls['quantity'].setValue(this.quantity);
            this.loadFinalPrice();
        }
    }

    /**
     *  method to decrease menu item quantity
     */
    subMenuItemQty(menu_item_id) {
        let control = this.productForm.controls['menu_item[' + menu_item_id + ']'];
        let qty = parseInt(control.value);

        if (qty > 0) {
            control.setValue(qty - 1);
            this.loadFinalPrice();
        }
    }

    /**
     *  method to increase menu item quantity
     */
    addMenuItemQty(menu_item_id) {
        let control = this.productForm.controls['menu_item[' + menu_item_id + ']'];
        let qty = control.value;
        let max = this.getMenuMaxQuantity(menu_item_id);
        let total = this.getMenuTotalQuantity(menu_item_id);

        if(total + 1 <= max || !max || max == 0) {
            control.setValue(parseInt(control.value) + 1);
            this.loadFinalPrice();
        } else {
            this.translateService.get('Max {{value1}} items allowed in select menu', { "value1" : max }).subscribe(value => {
                let toast = this.toastCtrl.create({
                    message: value,
                    duration: 2000
                });
                toast.present();
            });            
        }   
    }

    getMenuMaxQuantity(menu_item_id: number) {        
        for(let i of this.product.menu) {
            for(let j of i.vendorItemMenuItems) {
                if(j.menu_item_id == menu_item_id) {
                    return i.max_quantity;
                }
            }
        }   

        for(let i of this.product.addons) {
            for(let j of i.vendorItemMenuItems) {
                if(j.menu_item_id == menu_item_id) {
                    return i.max_quantity;
                }
            }
        }   
    }

    getMenuMinQuantity(menu_item_id: number) {
        for(let i of this.product.menu) {
            for(let j of i.vendorItemMenuItems) {
                if(j.menu_item_id == menu_item_id) {
                    return i.min_quantity;
                }
            }
        }   
        for(let i of this.product.addons) {
            for(let j of i.vendorItemMenuItems) {
                if(j.menu_item_id == menu_item_id) {
                    return i.min_quantity;
                }
            }
        }   
    }

    validateMenuItemCheck(menu_item_id) {
        let control = this.productForm.controls['menu_item[' + menu_item_id + ']'];
        
        //no need to validate for unchecking checkbox 
        if(control.value == false)
            return true;
        
        let max = this.getMenuMaxQuantity(menu_item_id);
        let total = this.getMenuTotalQuantity(menu_item_id);
        
        if(total <= max || !max || max == 0) {
            this.loadFinalPrice();
            return true;            
        } else {
            control.setValue(false);

            this.translateService.get('Max {{value1}} items allowed in select menu', { "value1" : max }).subscribe(value => {
                let toast = this.toastCtrl.create({
                    message: value,
                    duration: 2000
                });
                toast.present();
            });         
        }   
    }

    getMenuTotalQuantity(menu_item_id: number) {
        
        let menu_type;

        //get current menu's menu items 
        let menuItems = [];
        for(let i of this.product.menu) {
            for(let j of i.vendorItemMenuItems) {
                if(j.menu_item_id == menu_item_id) {
                    menu_type = i.quantity_type;
                    menuItems = i.vendorItemMenuItems;
                    break;        
                }
            }
        }
        for(let i of this.product.addons) {
            for(let j of i.vendorItemMenuItems) {
                if(j.menu_item_id == menu_item_id) {
                    menu_type = i.quantity_type;
                    menuItems = i.vendorItemMenuItems;
                    break;        
                }
            }
        }

        //get total 
        let total = 0;
        for(let menuItem of menuItems) {

            //checkbox

            if(menu_type == 'checkbox' && this.productForm.controls['menu_item[' + menuItem.menu_item_id + ']'].value == true) {
                total += 1;
            }
            
            //selection  
            if(menu_type != 'checkbox') {
                total += parseInt(this.productForm.controls['menu_item[' + menuItem.menu_item_id + ']'].value);
            }               

            console.log(total);
        }

        console.log(total);

        return total;
    }

    /**
     * method to reset all values on 
     * area changes
     */
    resetValues() {
        this.dateChange = false;
        this.timeslots = [];
        this.productForm.controls['delivery_date'].setValue('');
    }

    /**
     * method to load product capacity on 
     * date change
     */
    loadProductCapacity() {
        this.productService.productCapacity(
            this.product.item.item_id, 
            this.productForm.controls['delivery_date'].value
        ).subscribe(result => {
            this.maxQuantity = parseInt(result.capacity);
            /*if(this.quantity > this.maxQuantity) {
                this.quantity = this.maxQuantity;
            }*/
        });
    }

    addToCart() {
    
        this.submitAttempt = true;
    
        if (this.productForm.valid) {
    
          let params = this.productForm.value;
    
          this.cartService.add(params).subscribe(data => {
    
            if (data.operation == 'success') {
              this.translateService.get('Item added to cart').subscribe(value => {
                let toast = this.toastCtrl.create({
                  message: value,
                  duration: 4000
                });
                toast.present();
              });
    
              this.dismiss();
            } 
            else 
            {
                let msg = '';
                
                for (var i in data.message) {
                    var value = data.message[i];
                    for (var j in value) {
                       msg += value[j] + "<br />";
                    }
                }
                
                this.translateService.get('Add to cart').subscribe(value => {
                    let alert = this.alertCtrl.create({
                        title: value,
                        subTitle: msg,
                        buttons: ['OK']
                    });
                    alert.present();
                });                
            }
          });
    
        } else {
          this.translateService.get('Please check form carefully').subscribe(value => {
            let toast = this.toastCtrl.create({
              message: value,
              duration: 4000
            });
            toast.present();
          });
        }
    }
    
    /**
	 * Sets the default dates for min/max validation
	 */
    setDates() {
    
        let today = new Date();
    
        today.setHours(0, 0, 0);
        this.todayStr = today.toISOString().substring(0, 10);
    
        var dd = today.getDate();
        var mm = today.getMonth(); // 0 is January, so we must add 1
        var yyyy = today.getFullYear();
    
        this.todayDate = new Date((yyyy), mm, dd).toISOString();
        this.maxDate = new Date((yyyy + 1), mm, dd).toISOString();
    }   
    
    dismiss() {
        this.viewCtrl.dismiss();
    }
}