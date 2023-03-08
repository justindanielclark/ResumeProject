import React from "react";
import { AppState } from "../../types/appState";
import { NameData, PhoneContactData, WebInfoType, DateDataPointType } from "../../types/resumeData";
import { months } from "../../data/dateData";

type Props = {
  propState: AppState;
};

function Resume({ propState }: Props) {
  function generateHeader(propState: AppState): JSX.Element {
    const nameData = propState.name.data;
    const addressData = propState.contactAddress.data;
    const phoneData = propState.contactPhone.data;
    const emailData = propState.contactWeb.data.email;
    const websiteData = propState.contactWeb.data.websites;
    function createNameString(nameData: NameData): string {
      const { firstName, lastName, prefix, suffix } = nameData;
      let str = "";
      if (prefix !== "-None Selected-") {
        str += `${prefix} `;
      }
      str += `${firstName} ${lastName}`;
      if (suffix !== "-None Selected-") {
        str += `,  ${suffix}`;
      }
      return str;
    }
    function createPhoneString(
      phoneData: PhoneContactData,
      phoneField: keyof PhoneContactData
    ): string {
      let str = "";
      switch (phoneField) {
        case "mobile": {
          str += `M: `;
          break;
        }
        case "home": {
          str += `H: `;
          break;
        }
        case "other": {
          str += `O: `;
          break;
        }
      }
      str += phoneData[phoneField];
      return str;
    }
    function createWebsiteString(websiteData: WebInfoType): string {
      return `${websiteData.websiteName}: ${websiteData.URL}`;
    }
    function createPronounString(nameData: NameData): string {
      return `(${nameData.pronouns[0]}/${nameData.pronouns[1]}/${nameData.pronouns[2]})`;
    }
    return (
      <section className="flex w-full flex-row">
        <section className="flex basis-8/12 flex-col">
          <div className="flex w-full">
            <h1 className="w-full px-1 pt-1 text-5xl font-bold ">{createNameString(nameData)}</h1>
            {nameData.pronouns[0] === "-None Selected-" ? undefined : (
              <p className="text-xs">{createPronounString(nameData)}</p>
            )}
          </div>
          <p className="w-full border-t-2 border-b-2 border-slate-500 bg-slate-200 px-5 text-md leading-4 text-right">
            {"<Web Developer/>"}
          </p>
          {websiteData.map((website, index) => {
            return (
              <p key={index} className="w-full px-3 text-sm">
                {createWebsiteString(website)}
              </p>
            );
          })}
          {emailData.map((email, index) => {
            const emailTypes = ["Primary", "Secondary", "Tertiary"];
            return (
              <p key={index} className="w-full px-3 text-sm">
                {`${emailTypes[index]}: ${email}`}
              </p>
            );
          })}
        </section>
        <section className="flex basis-4/12 flex-col items-end justify-between border-l-2 border-slate-500 bg-slate-200 p-2">
          {/* PHONE CONTACT INFO */}
          <div>
            {phoneData.mobile !== "" ? (
              <p className="text-sm">{createPhoneString(phoneData, "mobile")}</p>
            ) : undefined}
            {phoneData.home !== "" ? (
              <p className="text-sm">{createPhoneString(phoneData, "home")}</p>
            ) : undefined}
            {phoneData.other !== "" ? (
              <p className="text-sm">{createPhoneString(phoneData, "other")}</p>
            ) : undefined}
          </div>
          {/* ADDRESS CONTACT INFO */}
          <div>
            <p className="text-right text-sm">{`${addressData.address1}${
              addressData.address2 ? ", " + addressData.address2 : ""
            }`}</p>
            <p className="text-right text-sm">{`${addressData.city}, ${addressData.state}, ${addressData.zip}`}</p>
          </div>
        </section>
      </section>
    );
  }
  function generateWorkExperienceSection(propState: AppState): JSX.Element | undefined {
    const { workExperience } = propState;
    if (workExperience.data.length === 0) {
      return undefined;
    }
    return (
      <section className="w-full">
        <h2 className="w-full bg-slate-700 pl-1 text-2xl font-bold text-white underline border-b-2 border-b-slate-900 border-t-2 border-t-slate-900">
          Work Experience:
        </h2>
        <div className="flex flex-row">
          {workExperience.data.map((work, idx) => {
            const workDescriptionArray = work.description.split("\n");
            return (
              <article
                key={idx}
                className="w-full border-r-2 border-slate-900 pt-1  last:border-r-0 odd:bg-slate-300 even:bg-slate-200"
              >
                <h3 className="font-bold text-lg px-1">
                  {"<"}
                  {work.jobTitle}
                  {"/>"}
                </h3>
                <p className="w-full px-4 text-xs ">
                  ({getDateString(work.startDate)} - {getDateString(work.endDate, "Current")})
                </p>
                <p className="px-2 text-md italic underline">{work.companyName}</p>
                <p className="px-3 text-xs">{`${work.address.address1}${
                  work.address.address2 ? ", " + work.address.address2 : ""
                }`}</p>
                <p className="px-3 text-xs">{`${work.address.city}, ${work.address.state}, ${work.address.zip}`}</p>
                <div className="">
                  <h3 className="px-2 text-md italic underline">Description:</h3>
                  {workDescriptionArray.map((line, idx) => {
                    return (
                      <p key={idx} className="px-3 text-xs">
                        {line}
                      </p>
                    );
                  })}
                </div>
              </article>
            );
          })}
        </div>
      </section>
    );
    function getDateString(dateData: DateDataPointType, currentString = ""): string {
      if (dateData.current) {
        return currentString;
      }
      const { data } = dateData;
      return `${months[data.getMonth()].slice(0, 3)} ${data.getDate()}, ${data
        .getFullYear()
        .toString()}`;
    }
  }
  function generateEducationSection(propState: AppState): JSX.Element | undefined {
    const { education } = propState;
    if (education.data.length === 0) {
      return undefined;
    }
    return (
      <section>
        <h2 className="w-full bg-slate-700 pl-1 text-2xl font-bold text-white underline border-b-2 border-b-slate-900 border-t-2 border-t-slate-900">
          Education:
        </h2>
        <div className="flex w-full">
          {education.data.map((edu, idx) => {
            return (
              <article
                key={idx}
                className="flex-1 flex-col border-r-2 border-slate-900 pt-1  last:border-r-0 odd:bg-slate-200 even:bg-slate-300"
              >
                <h3 className="px-1 text-md  font-bold">{edu.school}</h3>
                <p className="text-sm px-2">
                  Graduated: {getDateString(edu.end, "Currently Enrolled")}
                </p>
                <p className="text-sm flex-1 px-2">
                  {edu.degree.slice(0, 1)}
                  {edu.degreeType.slice(0, 1)} - {edu.field}
                </p>
              </article>
            );
          })}
        </div>
      </section>
    );
    function getDateString(dateData: DateDataPointType, currentString = ""): string {
      if (dateData.current) {
        return currentString;
      }
      const { data } = dateData;
      return `${months[data.getMonth()].slice(0, 3)} ${data.getFullYear().toString()}`;
    }
  }
  function generateProgramsCertsSection(propState: AppState): JSX.Element | undefined {
    const { nonCollegiateEducation } = propState;
    if (nonCollegiateEducation.data.length === 0) {
      return undefined;
    }
    return (
      <section>
        <h2 className="w-full bg-slate-700 pl-1 text-2xl font-bold text-white underline border-b-2 border-b-slate-900 border-t-2 border-t-slate-900">
          Programs/Certifications:
        </h2>
        <div className="flex w-full">
          {nonCollegiateEducation.data.map((edu, idx) => {
            const descriptionArray = edu.description.split("\n");
            return (
              <article
                key={idx}
                className="flex-1 flex-col border-r-2 border-slate-900 pt-1  last:border-r-0 odd:bg-slate-300 even:bg-slate-200"
              >
                <h3 className="px-1 text-md  font-bold">{edu.program}</h3>
                <p className="text-sm px-2">
                  {edu.end.current ? "" : "Graduated: "}
                  {getDateString(edu.end, "Currently Enrolled")}
                </p>
                <div>
                  {descriptionArray.map((line, idx) => {
                    return (
                      <p className="text-xs px-2.5" key={idx}>
                        {line}
                      </p>
                    );
                  })}
                </div>
              </article>
            );
          })}
        </div>
      </section>
    );
    function getDateString(dateData: DateDataPointType, currentString = ""): string {
      if (dateData.current) {
        return currentString;
      }
      const { data } = dateData;
      return `${months[data.getMonth()].slice(0, 3)} ${data.getFullYear().toString()}`;
    }
  }
  function generateProjectsSection(propState: AppState): JSX.Element | undefined {
    const { projects } = propState;
    if (projects.data.length === 0) {
      return undefined;
    }
    return (
      <section>
        <h2 className="w-full bg-slate-700 pl-1 text-2xl font-bold text-white underline border-b-2 border-b-slate-900 border-t-2 border-t-slate-900">
          Projects:
        </h2>
        <div className="flex w-full flex-col">
          {projects.data.map((project, idx) => {
            const descriptionArray = project.description.split("\n");
            return (
              <article
                key={idx}
                className="flex-1 flex-col border-b-2 border-slate-900 pt-1  odd:bg-slate-200 even:bg-slate-300"
              >
                <h3 className="px-1 text-md  font-bold">{project.name}</h3>
                {project.liveURL ? (
                  <p className="text-sm px-2">
                    <span className="italic underline font-bold inline-block pr-2">Live:</span>
                    {project.liveURL}
                  </p>
                ) : undefined}
                {project.repoURL ? (
                  <p className="text-sm px-2">
                    <span className="italic underline font-bold inline-block pr-2">Repo:</span>
                    {project.repoURL}
                  </p>
                ) : undefined}
                <div className="flex gap-4">
                  <div className="basis-8/12 grow-0 shrink-0 px-1">
                    <h4 className="text-sm italic underline">Description:</h4>
                    {descriptionArray.map((line, idx) => {
                      return (
                        <p key={idx} className="text-xs">
                          {line}
                        </p>
                      );
                    })}
                  </div>
                  <div className="basis-4/12 grow-0 shrink-1 px-1">
                    <h4 className="text-sm italic underline">Tech/Skills Used:</h4>
                    <p className="text-xs">{project.skills}</p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    );
  }
  function generateReferencesSection(propState: AppState): JSX.Element | undefined {
    const { references } = propState;
    if (references.data.length === 0) return undefined;
    return (
      <section>
        <h2 className="w-full bg-slate-700 pl-1 text-2xl font-bold text-white underline border-b-2 border-b-slate-900 border-t-2 border-t-slate-900">
          References:
        </h2>
        <div className="flex w-full flex-row">
          {references.data.map((ref, idx) => {
            return (
              <article
                key={idx}
                className="flex-1 flex-col border-b-2 border-slate-900 pt-1  odd:bg-slate-200 even:bg-slate-300"
              >
                <h3 className="px-1 text-md font-bold">
                  {ref.fName} {ref.lName}
                </h3>
                <p className="text-sm px-2">{ref.relation}</p>
                <p className="text-sm px-2">{ref.email}</p>
                <p className="text-sm px-2">{ref.phone}</p>
              </article>
            );
          })}
        </div>
      </section>
    );
  }
  return (
    <main className="mx-auto max-w-4xl bg-slate-100">
      {generateHeader(propState)}
      {generateWorkExperienceSection(propState)}
      {generateEducationSection(propState)}
      {generateProgramsCertsSection(propState)}
      {generateProjectsSection(propState)}
      {generateReferencesSection(propState)}
    </main>
  );
}

export default Resume;
