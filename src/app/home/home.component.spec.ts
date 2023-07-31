import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { ActivatedRoute, convertToParamMap, ParamMap } from '@angular/router';
import { of } from 'rxjs';

fdescribe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let activatedRouteMock: Partial<ActivatedRoute>;

  beforeEach(async () => {
    activatedRouteMock = {
      queryParams: of({}), // Provide an empty object initially
    };

    await TestBed.configureTestingModule({
      declarations: [HomeComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: activatedRouteMock as ActivatedRoute,
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display user details when user details are present in query parameters', () => {
    const userDetails = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      phoneNumber: '1234567890',
    };

    // Update the queryParams to have user details
    activatedRouteMock.queryParams = of(userDetails);

    // Trigger ngOnInit manually to process the query parameters
    component.ngOnInit();

    fixture.detectChanges();

    // Expect the user details to be displayed on the page
    const firstNameElement = fixture.nativeElement.querySelector('p strong');
    expect(firstNameElement.textContent.trim()).toBe('First Name:');
    const userDetailsElements =
      fixture.nativeElement.querySelectorAll('p strong + p');
    expect(userDetailsElements[0].textContent.trim()).toBe('John'); // First Name
    expect(userDetailsElements[1].textContent.trim()).toBe('Doe'); // Last Name
    expect(userDetailsElements[2].textContent.trim()).toBe('john@example.com'); // Email
    expect(userDetailsElements[3].textContent.trim()).toBe('1234567890'); // Phone Number
  });

  it('should not display user details when user details are not present in query parameters', () => {
    // No user details in the queryParams

    // Trigger ngOnInit manually to process the query parameters
    component.ngOnInit();

    fixture.detectChanges();

    // Expect the userDetails to be undefined
    expect(component.userDetails).toBeUndefined();

    // Expect the user details section not to be displayed on the page
    const userDetailsSection = fixture.nativeElement.querySelector('div');
    expect(userDetailsSection).toBeNull();
  });
});
