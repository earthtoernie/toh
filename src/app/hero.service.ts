
import {Injectable} from "@angular/core";
import {Hero} from "./hero";
import {HEROES} from "./mock-heroes";
import {Http, Headers} from "@angular/http";

import 'rxjs/add/operator/toPromise';


@Injectable()
export class HeroService {

  private heroesUrl = 'api/heroes';  // URL to web api
  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http: Http){}

  getHeroes(): Promise<Hero[]> {
    console.log("called getHeroes");
    return this.http.get(this.heroesUrl)
      .toPromise()
      .then(response => response.json().data as Hero[])
      .catch(this.handleError);

    // return Promise.resolve(HEROES);
  }

  getHero(id: number): Promise<Hero>{
    // return this.getHeroes()
    //   .then(heroes => heroes.find(hero => hero.id === id));
    console.log("called getHero");
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get(url)
      .toPromise()
      .then(response => response.json().data as Hero)
      .catch(this.handleError);
  }

  update(hero: Hero): Promise<Hero>{
    const url = `${this.heroesUrl}/${hero.id}`;
    return this.http
      .put(url, JSON.stringify(hero), {headers: this.headers})
      .toPromise()
      .then(() => hero)
      .catch(this.handleError);
  }

  create(name: string, number: number): Promise<Hero>{
    console.log("name and number is: ", name, " : ", number);
    return this.http
      .post(this.heroesUrl, JSON.stringify({id: number, name: name}), {headers: this.headers})
      .toPromise()
      .then(res => res.json().data)
      .catch(this.handleError);
  }

  delete(id: number): Promise<void> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.delete(url, {headers: this.headers})
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any>{
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

}

