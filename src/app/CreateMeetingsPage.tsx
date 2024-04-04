'use client'

import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";
import  { useState } from "react";


export default function CreateMeetingsPage(){
    
    const client= useStreamVideoClient();
     const [descriptionInput, setDescriptionInput]=useState("");
     const [startTimeInput, setStartTimeInput]=useState("");
     const [participantsInput,setParticipantsInput]=useState("");
     const [call,setCall]= useState<Call>();

     async function createMeeting() {
         try{
            const id= crypto.randomUUID();

            const call=client?.call("default", id);

            await call?.getOrCreate({
                data:{
                    custom:{description: descriptionInput}
                },
            });
            setCall(call);

         }catch (error){
            console.error(error)
            alert("something went wrong")
         }
     }

    return( 
     <>
    <div className="flex flex-col items-center space-y-6">
        <h1 className="text-center text-2xl font-bold"> welcome !</h1>
    </div>
    <div className="mx-auto w-80  space-y-6  rounded-md bg-slate-100 p-5">
        <h2 className="text-xl  font-bold">Create a New meeting</h2>
        <DescriptionInput value={descriptionInput} onChange={setDescriptionInput} />
        <StartTimeInput value={startTimeInput} onChange={setStartTimeInput} />
        <ParticipantsInput value={participantsInput} onChange={setParticipantsInput} />

        <button onClick={createMeeting} className="">Create meeting</button>
    </div>
    {call && <MeetingLink call={call}/>}
    </>
    );
}

interface DescriptionInputProps{
    value:string,
    onChange: (value:string)=> void,
}
function DescriptionInput({value, onChange}:DescriptionInputProps){
    const [active, setActive]= useState(false);

    return <div className="space-y-2"> 
        <div className="font-medium">  Meeting Info: </div>
        <label className="flex items-center gap-1.5">
            <input
            type="checkbox"
            checked={active}
            onChange={(e)=>{
                setActive(e.target.checked);
                onChange("");
            }}
            />
            Add description
        </label>
        {active && (
            <label className="block space-y-1">
                <span className="font-medium">Description</span>
                <textarea
                value={value}
                onChange={(e)=>onChange(e.target.value)}
                maxLength={500}
                className="w-full rounded-md border border-gray-300 p-2"
                />
            </label>
        )}
    </div>
}

interface StartTimeInputProps{
    value:string,
    onChange: (value:string)=> void,
}
function StartTimeInput({value,onChange}:StartTimeInputProps){
    const [active, setActive]= useState(false);
    const dateTimeLocalNow=new Date(
        new Date().getTime()-new Date().getTimezoneOffset()*60_000,
    )
     .toISOString()
     .slice(0,16);
    return <div className="space-y-2">
        <div className="font-medium">Meeting Start:</div>
        <label className="flex items-center gap-1.5">
            <input
             type="radio"
             checked={!active}
             onChange={()=>{
                setActive(false);
                onChange("")
             }}
             />
             Start Meeting Immediately
        </label>

        <label className="flex items-center gap-1.5">
            <input
             type="radio"
             checked={active}
             onChange={()=>{
                setActive(true);
                onChange(dateTimeLocalNow)
             }}
             />
             Start Meeting at date/time
        </label>
        {active &&(
            <label className="block space-y-1">
                <span className="font-medium">start time</span>
                <input
                type="datetime-local"
                value={value}
                onChange={(e)=>onChange(e.target.value)}
                min={dateTimeLocalNow}
                className="w-full rounded-md border border-gray-300 p-2"
                />
            </label>
        )}

    </div>  
}

interface ParticipantsInputProps{
    value:string,
    onChange: (value:string)=> void,
}

function ParticipantsInput({value,onChange}:ParticipantsInputProps){

    const [active, setActive]= useState(false);

    return <div className="space-y-2">
      <div className="font-medium">Participants</div>
    <label className="flex items-center gap-1.5">
    <input
     type="radio"
     checked={!active}
     onChange={()=>{
        setActive(false);
        onChange("")
     }}
     />
     Everyone with link can join
     </label>
     <label className="flex items-center gap-1.5">
    <input
     type="radio"
     checked={active}
     onChange={()=>{
        setActive(true);
        onChange("")
     }}
     />
     Private meeting
     </label>
     {active &&(
        <label className="block space-y-1">
            <span className="font-medium">participant emails</span>
            <textarea
            value={value}
            onChange={(e)=> onChange(e.target.value)}
            placeholder="enter participant emails separated by commas"
            className="w-full rounded-md border border-gray-300 p-2"
            />
        </label>
     )}
     </div>
}

interface MeetingLinkProps{
     call: Call;
}
function MeetingLink({call}:MeetingLinkProps){
    const meetingLink= `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${call.id}`
    return <div className="text-center">
        {meetingLink}
    </div>
}