import {Component, OnInit} from '@angular/core';
import {BuildsService} from '../builds.service';
import {Observable, interval} from 'rxjs';
import {startWith, switchMap} from 'rxjs/internal/operators';

@Component({
    selector: 'app-builds',
    templateUrl: './builds.component.html',
    styleUrls: ['./builds.component.scss']
})
export class BuildsComponent implements OnInit {
    public $builds: Observable<any>;

    constructor(private buildsService: BuildsService) {
    }

    ngOnInit() {
        this.$builds = interval(5000).pipe(
            startWith(0),
            switchMap(() => this.buildsService.getAll()
            )
        );
    }

}
