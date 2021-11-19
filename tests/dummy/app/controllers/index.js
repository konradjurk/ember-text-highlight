import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class IndexController extends Controller {
  @tracked query = '';

  @tracked demoList = [
    {
      checked: true,
      image: 'https://lh4.googleusercontent.com/-8a5E4OIgwNo/AAAAAAAAAAI/AAAAAAAAABg/D260JmtsLLY/photo.jpg?sz=250',
      name: 'Konrad Jurk',
      description: 'Ember.js ist ein clientseitiges JavaScript-Webframework zur Erstellung von Single-Page-Webanwendungen.'
    },
    {
      checked: true,
      image: 'https://randomuser.me/api/portraits/women/78.jpg',
      name: 'Scarlett Marshall',
      description: 'I signed with Sony, we wanted to re-release \'Fade\' as \'Faded\' with a brand new mix.'
    },
    {
      checked: true,
      image: 'https://randomuser.me/api/portraits/women/71.jpg',
      name: 'Genschaw Rd',
      description: 'Some people remaster their records six, seven times'
    },
    {
      image: 'https://randomuser.me/api/portraits/men/64.jpg',
      name: 'Bryan Burke',
      description: 'I can remember the first time I ever recorded my vocals on to a beat.'
    },
    {
      image: 'https://randomuser.me/api/portraits/men/66.jpg',
      name: 'Konrad Anthony',
      description: 'Ember.js est un cadriciel (framework) open-source JavaScript tourné vers les applications web.'
    },
    {
      image: 'https://randomuser.me/api/portraits/women/59.jpg',
      name: 'Vanessa Martin',
      description: 'Ember.js ułatwiająca pisanie aplikacji internetowych po stronie klienta z użyciem wzorca MVC.'
    },
    {
      image: 'https://randomuser.me/api/portraits/women/60.jpg',
      name: 'Katie Harris',
      description: 'Every demo I do has a mandolin or resonator on it.'
    },
    {
      checked: true,
      image: 'https://randomuser.me/api/portraits/men/86.jpg',
      name: 'Gabriel Sanders',
      description: 'Ember.js, açık kaynak kodlu web uygulama çatısı.'
    },
    {
      image: 'https://randomuser.me/api/portraits/men/87.jpg',
      name: 'Dylan Andrews',
      description: 'I can remember the first time I ever recorded my vocals on to a beat.'
    }
  ];

  get filteredDemoList() {
    const queryRegex = new RegExp(this.get('query'), 'i');
    const demoList = this.get('demoList');
    return demoList.filter(item => item.name.match(queryRegex) || item.description.match(queryRegex));
  }

  @action whitelistAllEmployees() {}
  @action whitelistItem(item) {}
}
