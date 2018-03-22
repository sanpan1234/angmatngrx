import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { states, Address, Hero } from '../models/hero-data-model';
import { HeroService } from './hero.service';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit, OnChanges {
  @Input() hero: Hero;
  heroForm: FormGroup;
  states = states;
  nameChangeLog: string[] = [];
  
  constructor(private fb: FormBuilder, private heroSvc: HeroService) {
    this.createForm();
    this.logNameChange();
  }

  ngOnInit() {
  }

  ngOnChanges() {
    this.rebuildForm();
  }

  createForm() {
    this.heroForm = this.fb.group({
      name: ['', Validators.required], //<--the formControl called name.
      /* address: this.fb.group({
        street: '',
        city: '',
        state: '',
        zip: '',
      }), */
      // address: this.fb.group(new Address()),
      secretLairs: this.fb.array([]),
      power: '',
      sidekick: ''
    });
  }

  rebuildForm() {
    this.heroForm.reset({
      name: this.hero.name,
    });
    this.setAddresses(this.hero.addresses);
  }

  setAddresses(addresses: Address[]) {
    const addressFGs = addresses.map(address => this.fb.group(address));
    const addressFormArray = this.fb.array(addressFGs);
    this.heroForm.setControl('secretLairs', addressFormArray);
  }

  get secretLairs(): FormArray{
    return this.heroForm.get('secretLairs') as FormArray;
  }

  addLair() {
    this.secretLairs.push(this.fb.group(new Address()));
  }

  removeLair(idx) {
    this.secretLairs.removeAt(idx);
  }

  logNameChange() {
    const nameControl = this.heroForm.get('name');
    nameControl.valueChanges.forEach(
      (value: string) => this.nameChangeLog.push(value)
    );
  }

  onSubmit() {
    this.hero = this.prepareSaveHero();
    this.heroSvc.updateHero(this.hero).subscribe(/*error handling*/);
    this.rebuildForm();
  }

  prepareSaveHero(): Hero{
    const formModel = this.heroForm.value;
    //deep copy of the form model lairs
    //if we don't do this, a direct reference to 
    //formModel's addresses (secretLairs) would be assigned to 
    //the original hero object. 
    const secretLairsDeepCopy: Address[] = formModel.secretLairs.map(
      (address: Address) => Object.assign({}, address)
    );
    //return new Hero containing a combination of the original hero values
    //and deep copies of changed form model values
    const saveHero: Hero = {
      id: this.hero.id,
      name: formModel.name as string,
      addresses: secretLairsDeepCopy
    }
    return saveHero;
  }

  revert() {
    this.rebuildForm();
  }
}
