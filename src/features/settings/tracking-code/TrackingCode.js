import { Button, Steps } from "antd";
import React, { useEffect, useState } from "react";
import { CopyBlock, atomOneLight } from "react-code-blocks";
import { CID_OPTION, EVENT_OPTION, STANDARD_OPTION, TIMER_OPTION } from "../../../constants/constants";
import StepClientId from "./step-client-id/StepClientId";
import StepEventOptions from "./step-event-options/StepEventOptions";
import StepStandardOption from "./step-standard-options/StepStandardOptions";
import StepTimerOptions from "./step-timer-options/StepTimerOptions";
import styles from "./TrackingCode.module.css";

const TrackingCode = (props) => {
   const cid = "CID-1234-ABC";
   const [current, setCurrent] = useState(0);
   const [currentOptions, setCurrentOptions] = useState([
      { type: CID_OPTION, list: [cid] },
      { type: STANDARD_OPTION, list: [] },
      { type: TIMER_OPTION, list: [] },
      { type: EVENT_OPTION, list: [] },
   ]);
   const [text, setText] = useState("");

   let template = `
   <!-- Tracking Start Here -->
   <!-- Data Analytics Snippet Start Here -->
   <script>
       (function (window, document, script, path, da, scriptElement, firstScriptElement) {
           window['DataAnalyticsObject'] = da;
           window[da] = window[da] ||
               function () {
                   (window[da].q = window[da].q || []).push(arguments);
               };
           window[da].ts = 1 * new Date();

           scriptElement = document.createElement(script);
           firstScriptElement = document.getElementsByTagName(script)[0];
           scriptElement.async = 1;
           scriptElement.src = path;
           firstScriptElement.parentNode.insertBefore(scriptElement, firstScriptElement);
       })(window, document, 'script', 'http://analytics.com/datacollector/tracking.js', 'da');

        #cid_options#
        #standard_options#
        #timer_options#
        #event_options#
   </script>
   <!-- Data Analytics Snippet End Here -->
   <!-- Tracking End Here -->
   `;

   const onOptionChange = (options) => {
      let optionsArray = currentOptions.filter((option) => option.type !== options.type);
      optionsArray.push(options);
      setCurrentOptions(optionsArray);
   };

   useEffect(() => {
      const stringByOptions = (options) => {
         let optionsString = "";
         switch (options.type) {
            case CID_OPTION:
               optionsString = `da('send', 'cid', '${options.list[0]}');\n`;
               break;
            case STANDARD_OPTION:
               for (let option of options.list) {
                  optionsString = optionsString.concat(`da('send', '${option}');\n\t`);
               }
               break;
            case TIMER_OPTION:
               for (let option of options.list) {
                  optionsString = optionsString.concat(`da('send', '${option}');\n\t`);
               }
               break;
            case EVENT_OPTION:
               for (let option of options.list) {
                  optionsString = optionsString.concat(
                     `da('send', 'event', '${option.type}', '${option.elementId}');\n\t`
                  );
               }
               break;
         }
         return optionsString;
      };

      let code = (" " + template).slice(1);
      for (let options of currentOptions) {
         let replacementKey = `#${options.type}s#`;
         code = code.replace(replacementKey, stringByOptions(options));
      }
      setText(code);
   }, [currentOptions]);

   const onStepChange = (current) => {
      setCurrent(current);
   };

   const next = (e) => {
      setCurrent(current + 1);
   };

   const previous = (e) => {
      setCurrent(current - 1);
   };

   return (
      <div className={styles.trackingCodeContainer}>
         <div className={styles.stepperContainer}>
            <Steps type="navigation" size="small" current={current} onChange={onStepChange} className={styles.steps}>
               <Steps.Step title="Client ID" />
               <Steps.Step title="Standard options" />
               <Steps.Step title="Timer options" />
               <Steps.Step title="Event options" />
            </Steps>
            <div className={styles.stepContainer}>
               {
                  {
                     0: <StepClientId cid={cid} />,
                     1: <StepStandardOption onOptionChange={onOptionChange} />,
                     2: <StepTimerOptions onOptionChange={onOptionChange} />,
                     3: <StepEventOptions onOptionChange={onOptionChange} />,
                  }[current]
               }
            </div>
            <div className={styles.buttonHolder}>
               {current > 0 && (
                  <Button type="link" onClick={previous}>
                     Previous
                  </Button>
               )}
               {current < 3 && (
                  <Button type="primary" onClick={next}>
                     Next
                  </Button>
               )}
            </div>
         </div>
         <div className={styles.codeView}>
            <CopyBlock
               text={text}
               showLineNumbers={false}
               theme={atomOneLight}
               wrapLines={true}
               codeBlock
               className={styles.copyBlock}
            />
         </div>
      </div>
   );
};

export default TrackingCode;
