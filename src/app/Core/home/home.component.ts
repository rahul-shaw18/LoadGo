import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, OnChanges, SimpleChanges,} from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators, } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, AfterViewInit, OnChanges {
  toggleForm: boolean = false;
  year = new Date().getFullYear();
  total_price: any;
  pickUp: any;
  dropOff: any;
  distance: any;
  @ViewChild('pickUpField') pickUpField!: ElementRef;
  @ViewChild('dropOffField') dropOffField!: ElementRef;

  disable = true;
  vehicles = [
    {
      id: 1,
      image: '../../../assets/images/tataAce.jpg',
      vehicleName: 'TATA Ace',
      vehicleBrand: 'TATA Motors',
      dailyWages: 25,
      inService: true,
    },
    {
      id: 2,
      image: '../../../assets/images/mahindraBolero.jpeg',
      vehicleName: 'Bolero',
      vehicleBrand: 'Mahindra',
      dailyWages: 25,
      inService: true,
    },
    {
      id: 3,
      image: '../../../assets/images/vehicles/bike2.jpg',
      vehicleName: 'coming soon',
      vehicleBrand: '.....',
      dailyWages: 25,
      inService: false,
    },
  ];
  form!: FormGroup;
  durationInMinutes!: number;

  distanceService = new google.maps.DistanceMatrixService();
  directionsService = new google.maps.DirectionsService();

  constructor(private formBuilder: FormBuilder, private activatedRoute:ActivatedRoute) {
    this.form = this.formBuilder.group({
      pickUp: ['',   Validators.required,],
      dropOff: ['',     Validators.required,    ],
      firstName: ['', Validators.required],
      LastName: ['', Validators.required],
      phoneNo: ['', Validators.required],
    });
  }

  get gf() {
    return this.form.controls;
  }

  ngOnChanges(changes: SimpleChanges) {}

  ngOnInit(): void {
    this.activatedRoute.fragment.subscribe((value) => {
      console.log(value);
      this.jumpTo(value)
      
    })
  }

  jumpTo(section:any) {
    document.getElementById(section)?.scrollIntoView({behavior:'smooth'})
  }

  ngAfterViewInit(): void {
    console.log('controls ', this.form.controls);
    console.log('value ', this.form.value);
    // forPickUp Location
    this.pickUp = new google.maps.places.Autocomplete(
      this.pickUpField.nativeElement
    ).setComponentRestrictions({ country: 'IN' });

    // forDropOff Location
    this.dropOff = new google.maps.places.Autocomplete(
      this.dropOffField.nativeElement
    ).setComponentRestrictions({ country: 'IN' });

    


  }

  onSubmit() {
     
    console.log('controls ', this.form.controls);
    console.log('value ', this.form.value);
  }

  getDistance() {
    this.form.patchValue({ pickUp: this.pickUpField.nativeElement.value })
    this.form.patchValue({ dropOff: this.dropOffField.nativeElement.value });

    this.toggleForm = true;

    // distance Calculation 
    let origin = this.pickUpField.nativeElement.value;
    let destination = this.dropOffField.nativeElement.value;
    this.distanceService.getDistanceMatrix(
      {
        origins: [origin],
        destinations: [destination],
        travelMode: google.maps.TravelMode.DRIVING,
        unitSystem: google.maps.UnitSystem.METRIC,
      },
      (response, status) => {
        // Check if the Distance Matrix request was successful
        if (status === google.maps.DistanceMatrixStatus.OK) {
          // Extract the distance value from the response
          this.distance = response?.rows[0].elements[0].distance.value;
          if (this.distance) {
            this.distance = this.distance / 1000;
            this.calculateFare();
          }
          console.log(
            `Distance between pickup and dropoff is ${this.distance} KM.`
          );
        } else {
          console.error(`Distance Matrix request failed: ${status}`);
        }
      }
    );

      // duration Calculation
    let request = {
      origin: this.pickUpField.nativeElement.value,
      destination: this.dropOffField.nativeElement.value,
      travelMode: google.maps.TravelMode.DRIVING,
    };

    this.directionsService.route(request, (result, status) => {
      if (status === 'OK') {
        const durationInSeconds = result?.routes[0]?.legs[0]?.duration?.value;

        if (durationInSeconds) {
          this.durationInMinutes = Math.round(durationInSeconds / 60);

          console.log('Duration:', this.durationInMinutes, 'minutes');
        }
      } else {
        console.error('Directions request failed due to ' + status);
      }
    });
  }

  calculateFare() {
    let base_price = 250;
    let distance_cost = this.distance * 60;

    // Convert duration from minutes to hours
    let duration_minutes = this.durationInMinutes;
    let duration_hours = duration_minutes / 60;

    // Calculate additional cost after 2 hours
    let additional_cost;
    if (duration_hours > 2) {
      additional_cost = ((duration_minutes - 120) * 2) / 60;
    } else {
      additional_cost = 0;
    }

    this.total_price = base_price + distance_cost + additional_cost;

    return this.total_price;
  }

  goBack() {
    console.log('value ', this.form.controls);
    this.toggleForm = !this.toggleForm;
  }
  toggle=false
  toggleMenu() {
    this.toggle =!this.toggle
  }
}
