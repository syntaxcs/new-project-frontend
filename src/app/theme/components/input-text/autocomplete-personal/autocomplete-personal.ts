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
export class AutocompletePersonalComponent implements OnInit {
    @Input() title: string;
    @Input() placeholder: string;
    @Input() positions: string[];
    @Input() percent: boolean;
    @Input() onOtherPersonal = false;
    @Input() _selectedPersonal = {};

    private courses = [];
    public filteredCourses = '';
    public myControl = new FormControl();
    public otherCourses: { coursesCode: '' };
    public loading = true;
    constructor(
        private personalservice: PersonalService
    ) { }

    @Output()
    selectedPersonalChange = new EventEmitter<any>();

    @Input('selectedPersonal')
    set setSelectedCourses(courses) {
        if (courses === undefined) this._selectedPersonal = null;
        else { this._selectedPersonal = courses || []; }
    }
    get selectedPersonal() {
        return this._selectedPersonal;
    }

    ngOnInit() {
        // this.personalservice.getCourses().subscribe((courses: Courses[]) => {
        //     this.courses = courses;
        //     this.loading = false;
        // });
        // this.filteredCourses = this.myControl.valueChanges.pipe(
        //     startWith(null),
        //     map(value => value && value instanceof Courses ? value.coursesCode : value),
        //     map(value => value ? this.filter(value) : this.courses.slice()), );
    }
    filter(name: string) {
        return this.courses.filter(courses => courses.coursesCode.indexOf(name) === 0);
    }
    displayFn(personal): string {
        return personal ? `${personal.personalsCode} ${personal.personalsNameTh}` : '';
    }
    addSelectCourses(personal) {
        this.selectedPersonalChange.emit(personal);
    }
}