import { TuiPlaywrightTestsConfig } from "../typings/tuiPlaywrightTestsConflig";

const customEnvironmentVariables: TuiPlaywrightTestsConfig = {
  US_User:{
    
    url:'TEST_US_URL',
  },
   UK_User:{
    
    url:'TEST_UK_URL',
  },
   NL_User:{
   
    url:'TEST_NL_URL',
  },
};
export default customEnvironmentVariables;