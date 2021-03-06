// Keep the Input import for now, we'll remove it later:
import {Component, Input, OnInit} from "@angular/core";
import {Router, ActivatedRoute} from "@angular/router";
import {UserService} from "../services/user.service";

@Component({
    selector: 'my-login',
    templateUrl: 'app/views/login.component.html',
    styleUrls: ['app/styles/login.component.css']
})

export class LoginComponent implements OnInit {
    @Input()
    name: string;
    showLoginError: boolean = false;


    constructor(private router: Router,
        private userService: UserService)
    {
        // set active class for menu
        let ulMenu = document.getElementsByTagName("ul")[0];
        ulMenu.children[0].className="";
        ulMenu.children[1].className="";
    };

    ngOnInit(): void {

    };

    static goBack(): void {
        window.history.back();
    };

    //noinspection JSUnusedLocalSymbols
    private navigate(url: string): void{
        this.router.navigate([url]);
    };

    private onLoginError(): void
    {
        console.log("wrong user");
        this.showLoginError = true;
    }

    save(name: string, pass: string): void {

        if (!name || !pass)
        {
            return;
        }

        let self = this;
        this.userService.login(name, pass)
            .then(user => {
                if(user.token.length > 0)
                {
                    console.log("ok");
                    self.navigate("/bars");
                }
                else
                {
                    self.onLoginError();
                }
            })
            .catch(param =>
            {
                self.onLoginError();   
            });
    }

}