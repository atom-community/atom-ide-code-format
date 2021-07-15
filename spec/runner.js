"use babel"
import { createRunner } from "atom-jasmine3-test-runner"

// https://github.com/UziTech/atom-jasmine3-test-runner#api
export default createRunner({
  timeReporter: true,
  specHelper: true,
})
