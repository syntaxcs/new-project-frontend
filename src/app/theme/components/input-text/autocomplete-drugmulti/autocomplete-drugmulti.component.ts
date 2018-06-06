import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { DateAdapter, MatAutocompleteSelectedEvent, MatAutocomplete } from '@angular/material';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { DrugService } from '../../../../shared/services/drug.service'

@Component({
    selector: 'app-autocomplete-drugmulti',
    templateUrl: './autocomplete-drugmulti.component.html',
})

export class AutocompleteDrugmultiComponent implements OnInit {
    @Input() placeholder: string;
    @Input() title: string;
    @Input() formGroup: FormGroup;
    @Input() allowNull: false;

    public form = new FormArray([]);
    private _selectedDrugs = [];
    public filterDrugs = [];
    public myControl = new FormControl();
    public drugs: any = [];
    // public loading = true;
    public filtered: Observable<[{}]>;
    constructor(
        private formBuilder: FormBuilder,
        private drugservice: DrugService
    ) { }
    @Output() selectedDrugChange = new EventEmitter<any>();
    @Input('selectedDrugs')

    set setSelectedDrugs(countDrugs) {
        this._selectedDrugs = countDrugs || [];
        this._selectedDrugs.forEach((drug) => {
            const validator = {};
            validator['drug'] = [drug['drug'], Validators.required];
            validator['count'] = [drug['count'], Validators.required];
            this.form.push(this.formBuilder.group(validator));
        });
    }

    get selectedDrugs() {
        return this._selectedDrugs;
    }

    ngOnInit() {
        this.formGroup.addControl('countDrugs', this.form);
        if (typeof this._selectedDrugs[0] === 'undefined') {
            this.add();
        }
        this.setDrugToString();
        this.filtered = this.myControl.valueChanges.pipe(
            startWith(null),
            map(value => value ? this.filter(value) : this.drugs.slice()), );
    }

    displayFn(drugs): string {
        return drugs ? `${drugs.drugName}` + ' (' + `${drugs.drugPackages}` + ')' : '';
    }
    filter(name: string) {
        return this.filterDrugs.filter(drug => drug.drugName.indexOf(name) === 0 || drug.drugPackages.indexOf(name) === 0);
    }
    add() {
        this.selectedDrugs.push({});
        this.selectedDrugChange.emit(this.selectedDrugs);
        const validator = {};
        validator['drug'] = [undefined, Validators.required];
        validator['count'] = [undefined, Validators.required];
        this.form.push(this.formBuilder.group(validator));
    }


    remove(group) {
        const index: number = this.selectedDrugs.indexOf(group);
        if (index !== -1) {
            this.selectedDrugs.splice(index, 1);
            this.selectedDrugChange.emit(this.selectedDrugs);
            this.form.removeAt(index);
        }
    }

    setDrugToString() {
        this.drugservice.getDrug().subscribe(result => {
            this.filterDrugs = result;
        })
    }
}