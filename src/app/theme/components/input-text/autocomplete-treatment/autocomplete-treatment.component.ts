import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { DateAdapter, MatAutocompleteSelectedEvent, MatAutocomplete } from '@angular/material';
import { startWith, map } from 'rxjs/operators';
import { TreatmentService } from '../../../../shared/services/treatment.service'
import { Observable } from 'rxjs';
@Component({
    selector: 'app-autocomplete-treatment',
    templateUrl: './autocomplete-treatment.component.html',
})

export class AutocompleteTreatmultiComponent implements OnInit {
    @Input() placeholder: string;
    @Input() title: string;
    @Input() formGroup: FormGroup;

    public form = new FormArray([]);
    private _selectedTreatments = [];
    public myControl = new FormControl();
    public filtered: Observable<[{}]>;
    public treatment: any = [];

    constructor(
        private formBuilder: FormBuilder,
        private treatmentservice: TreatmentService
    ) { }

    @Output() selectedTreatChange = new EventEmitter<any>();
    @Input('selectedTreatments')

    set setSelectedTreatments(treatments) {
        this._selectedTreatments = treatments || [];
        this._selectedTreatments.forEach((treat) => {
            const validator = {};
            validator['treat'] = [treat['treat'], Validators.required];
            validator['hours'] = [treat['hours'], Validators.required];
            this.form.push(this.formBuilder.group(validator));
        });
    }

    get selectedTreatments() {
        return this._selectedTreatments;
    }

    ngOnInit() {
        this.formGroup.addControl('treatment', this.form);
        if (typeof this._selectedTreatments[0] === 'undefined') {
            this.add();
        }
        this.treatmentservice.getTreat().subscribe(result => {
            this.treatment = result;
        })
        this.filtered = this.myControl.valueChanges.pipe(
            startWith(null),
            map(value => value ? this.filter(value) : this.treatment.slice()));
    }
    displayFn(treats): string {
        return treats ? `${treats.treatMents}` : '';
    }
    filter(name: string) {
        return this.treatment.filter(treat => treat.treatMents.indexOf(name) === 0);
    }
    add() {
        this.selectedTreatments.push({});
        this.selectedTreatChange.emit(this.selectedTreatments);
        const validator = {};
        validator['treat'] = [undefined, Validators.required];
        validator['hours'] = [undefined, Validators.required];
        this.form.push(this.formBuilder.group(validator));
    }
    remove(treat) {
        const index: number = this.selectedTreatments.indexOf(treat);
        if (index !== -1) {
            this.selectedTreatments.splice(index, 1);
            this.selectedTreatChange.emit(this.selectedTreatments);
            this.form.removeAt(index);
        }
    }
}