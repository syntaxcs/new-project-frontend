
import { map, startWith } from 'rxjs/operators';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatAutocompleteSelectedEvent } from '@angular/material';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { PersonalService } from '../../../../shared/services/personal.service';
@Component({
    selector: 'app-autocomplete-personal',
    templateUrl: './autocomplete-personal.component.html'
})
export class AutocompletePersonalsComponent implements OnInit {
    @Input() title: string;
    @Input() personals: any = [];
    @Input() placeholder: string;
    @Input() positions: string[];
    @Input() percent: boolean;
    @Input() onOtherPersonal = false;
    @Input() _selectedPersonals: any;

    public filtered: Observable<[{}]>;
    public myControl = new FormControl();
    public setValueInput: string = '';
    public loading = true;
    public selected: any = [];
    constructor(
        private personalservice: PersonalService
    ) { }

    @Output()
    selectedPersonalsChange = new EventEmitter<any>();

    @Input('selectedPersonals')
    set setselectedPersonals(diseases) {
        this._selectedPersonals = diseases || [];
    }
    get selectedPersonals() {
        return this._selectedPersonals;
    }
    ngOnInit() {
        this.personalservice.getPerson().subscribe(result => {
            this.personals = result;
            this.loading = false;
        });
        this.filtered = this.myControl.valueChanges.pipe(
            startWith(null),
            map(value => value ? this.filter(value) : this.personals.slice()), );
    }
    filter(name: string) {
        return this.personals.filter(personal => personal.personId.indexOf(name) === 0 
        || personal.personNameTitle.indexOf(name) === 0 || personal.personName.indexOf(name) === 0
        || personal.personSurname.indexOf(name) === 0);
    }
    displayFn(personal) {
        return personal ? `${personal.personId} ${personal.personNameTitle}${personal.personName} ${personal.personSurname}` : '';
    }
    addSelectPersonals(disease) {
        this.selectedPersonalsChange.emit(disease);
    }
}