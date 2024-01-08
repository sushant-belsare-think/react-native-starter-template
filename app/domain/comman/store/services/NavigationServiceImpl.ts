import {NavigationContainerRef} from '@react-navigation/native';
import {AppDispatch, getStore} from '../../../../lib';
import {setCurrentNavAction} from '../reducers/NavigationReducer';
import {InstanceGetUtility} from '../../../../utils/InstanceGetUtility';
import {String} from '../../../authentication/constants/String';
export interface Route {
  name: string;
}
export interface NavState {
  currentNav?: string;
}
export interface NavigationService {
  setNavigationContainerComponent(
    navigationContainerComponent: NavigationContainerRef<ReactNavigation.RootParamList> | null,
  ): void;
  navToBack(): void;
  resetNavToLogin(dispatch: AppDispatch): void;
  navToTop(): void;
  navToHomeScreen(dispatch: AppDispatch): void;
  navToOTPScreen(dispatch: AppDispatch): void;
  navToOTPScreenFromLogin(dispatch: AppDispatch): void;
  navToLogin(dispatch: AppDispatch): void;
  navToCreatePassword(dispatch: AppDispatch): void;
  navToOTPfromSignup(dispatch: AppDispatch): void;
  navToApp(dispatch: AppDispatch): void;
  navToTax1099(dispatch: AppDispatch, loginUrl: string): void;
  // navToLogin(dispatch: AppDispatch): void;
  navToSignUp(dispatch: AppDispatch): void;
  navToStartFlowScreen(dispatch: AppDispatch): void;
  navToAuth(state: NavState, dispatch: AppDispatch): void;
}

export class NavigationServiceImpl implements NavigationService {
  private navigationContainerComponent?: NavigationContainerRef<ReactNavigation.RootParamList> | null;
  setNavigationContainerComponent(
    navigationContainerComponent: NavigationContainerRef<ReactNavigation.RootParamList> | null,
  ): void {
    this.navigationContainerComponent = navigationContainerComponent;
  }

  navToBack(): void {
    this.navigationContainerComponent?.goBack();
  }

  resetNavToLogin(dispatch: AppDispatch): void {
    dispatch(setCurrentNavAction('Signin'));
    this.navigationContainerComponent?.reset({
      index: 0,
      routes: [{name: 'Signin'}],
    });
  }

  getDispatch() {
    return getStore().dispatch;
  }

  navToTop(): void {
    this.navigationContainerComponent?.popToTop();
  }

  navToApp(dispatch: AppDispatch): void {
    this.dispatchAppContainerNav(dispatch, {name: 'Home'}, 'navigate');
  }

  navToTax1099(dispatch: AppDispatch, loginUrl: string): void {
    dispatch(setCurrentNavAction(String.Tax1099Screen));
    this.navigationContainerComponent?.navigate(String.Tax1099Screen, loginUrl);
  }

  async navToHomeScreen(dispatch: AppDispatch): void {
    await dispatch(setCurrentNavAction('Signin'));
    this.navigationContainerComponent?.reset({
      index: 0,
      routes: [{name: 'HomeScreen'}],
    });
    // this.dispatchAppContainerNav(dispatch, {name: 'HomeScreen'}, 'replace');
  }

  navToOTPScreen(dispatch: AppDispatch): void {
    this.dispatchAppContainerNav(
      dispatch,
      {
        name: String.OtpScreen,
        payload: {showModal: 'forgotPassword'},
      },
      'navigate',
    );
  }

  navToOTPScreenFromLogin(dispatch: AppDispatch): void {
    this.dispatchAppContainerNav(
      dispatch,
      {
        name: String.OtpScreen,
        payload: {showModal: 'login'},
      },
      'navigate',
    );
  }

  navToOTPfromSignup(dispatch: AppDispatch): void {
    this.dispatchAppContainerNav(
      dispatch,
      {
        name: String.OtpScreen,
        payload: {showModal: 'signup'},
      },
      'navigate',
    );
  }

  navToLogin(dispatch: AppDispatch): void {
    this.dispatchAppContainerNav(dispatch, {name: 'Signin'}, 'navigate');
  }

  navToCreatePassword(dispatch: AppDispatch): void {
    this.dispatchAppContainerNav(
      dispatch,
      {name: 'CreatePassword'},
      'navigate',
    );
  }

  navToSignUp(dispatch: AppDispatch): void {
    this.dispatchAppContainerNav(dispatch, {name: 'SignUpScreen'}, 'navigate');
  }

  navToStartFlowScreen(dispatch: AppDispatch): void {
    this.dispatchAppContainerNav(
      dispatch,
      {name: 'StartFlowScreen'},
      'navigate',
    );
  }

  navToAuth(state: NavState, dispatch: AppDispatch): void {
    if (state.currentNav === 'Onboarding') {
      return;
    }
    this.dispatchAppContainerNav(dispatch, {name: 'Onboarding'}, 'navigate');
  }

  private dispatchAppContainerNav(
    dispatch: AppDispatch,
    navigationNavigateActionPayload: Route,
    type: string,
  ) {
    if (type === 'replace') {
      this.dispatchNavWithNavContainerReplace(
        dispatch,
        navigationNavigateActionPayload,
        this.navigationContainerComponent,
      );
    } else {
      this.dispatchNavWithNavContainerNavigate(
        dispatch,
        navigationNavigateActionPayload,
        this.navigationContainerComponent,
      );
    }
  }

  private dispatchNavWithNavContainerNavigate(
    dispatch: AppDispatch,
    navigationNavigateActionPayload: {name: string},
    navContainerComponent?: NavigationContainerRef<ReactNavigation.RootParamList> | null,
  ) {
    if (!navContainerComponent) {
      return;
    }
    dispatch(setCurrentNavAction(navigationNavigateActionPayload.name));
    navContainerComponent.navigate(
      navigationNavigateActionPayload.name,
      navigationNavigateActionPayload.payload,
    );
  }

  private dispatchNavWithNavContainerReplace(
    dispatch: AppDispatch,
    navigationNavigateActionPayload: {name: string},
    navContainerComponent?: NavigationContainerRef<ReactNavigation.RootParamList> | null,
  ) {
    if (!navContainerComponent) {
      return;
    }
    dispatch(setCurrentNavAction(navigationNavigateActionPayload.name));
    navContainerComponent.replace(
      navigationNavigateActionPayload.name,
      navigationNavigateActionPayload.payload,
    );
  }

  private static INSTANCE: NavigationService;

  static getInstance(): NavigationService {
    this.INSTANCE = InstanceGetUtility.getInstance(
      NavigationServiceImpl,
      this.INSTANCE,
    );
    return this.INSTANCE;
  }
}
