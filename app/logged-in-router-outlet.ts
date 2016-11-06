/**
 * Created by ThaZalman on 15/10/2016.
 */
import {Router, RouterOutlet, ActivatedRoute, RouterOutletMap} from '@angular/router';
import {UserService} from "./services/user.service";
import {Directive} from "@angular/core/src/metadata/directives";
import {
    ElementRef, ComponentFactoryResolver, Injector, ResolvedReflectiveProvider,
    ViewContainerRef
} from "@angular/core";


@Directive({
    selector: 'loggedin-router-outlet'
})
export class LoggedInRouterOutlet extends RouterOutlet
{
    publicRoutes: string[];
    private parentRouter: RouterOutletMap;
    // private userService: UserService;

    constructor(parentOutletMap: RouterOutletMap,
                location: ViewContainerRef,
                resolver: ComponentFactoryResolver,
                private router: Router,
                name: string,
                private userService: UserService)
    {
        super(parentOutletMap, location, resolver, name);

        this.parentRouter = parentOutletMap;
        this.publicRoutes = ['', 'login'];
    }

    activate(activatedRoute: ActivatedRoute, loadedResolver: ComponentFactoryResolver, loadedInjector: Injector, providers: ResolvedReflectiveProvider[], outletMap: RouterOutletMap) {
        if (this._canActivate(activatedRoute.url)) {
            // debugger;
            return super.activate(activatedRoute, loadedResolver, loadedInjector, providers, outletMap);
        }

        // this.parentRouter.navigate(['Login']);
        // debugger;
        this.router.navigate(['login']);
    }

    _canActivate(url) {
        // debugger;
        return this.publicRoutes.indexOf(url) !== -1 || this.userService.isLoggedIn();
    }
}