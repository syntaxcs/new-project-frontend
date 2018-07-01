
import { map, startWith } from 'rxjs/operators';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatAutocompleteSelectedEvent } from '@angular/material';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { DiseaseService } from '../../../../shared/services/disease.service';
@Component({
    selector: 'app-autocomplete-disease',
    templateUrl: './autocomplete-disease.component.html'
})
export class AutocompleteDiseasesComponent implements OnInit {
    @Input() title: string;
    @Input() placeholder: string;
    @Input() positions: string[];
    @Input() percent: boolean;
    @Input() onOtherDisease = false;
    @Input() _selectedDiseases = [];

    public diseases: any = [];
    public filtered: Observable<[{}]>;
    public myControl = new FormControl();
    public setValueInput: string = '';
    public loading = true;
    public selected: any = [];
    constructor(
        private diseaseservice: DiseaseService
    ) { }

    @Output()
    selectedDiseasesChange = new EventEmitter<any>();

    @Input('selectedDiseases')
    set setselectedDiseases(diseases) {
        if (diseases === undefined) {
            this._selectedDiseases = null;
        } else {
            this._selectedDiseases = diseases || [];
        }
    }
    get selectedDiseases() {
        return this._selectedDiseases;
    }
    ngOnInit() {
        this.diseaseservice.getDis().subscribe(result => {
            this.diseases = result;
            this.loading = false;
        });
        this.filtered = this.myControl.valueChanges.pipe(
            startWith(null),
            map(value => value ? this.filter(value) : this.diseases.slice()), );
    }
    filter(name: string) {
        return this.diseases.filter(diseases => diseases.disName.indexOf(name) === 0 || diseases.disID.indexOf(name) === 0);
    }
    displayFn(diseases) {
        return diseases ? `${diseases.disID} ${diseases.disName}` : '';
    }
    addSelectDiseases(disease) {
        this.selectedDiseasesChange.emit(disease);
    }
}