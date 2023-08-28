"use client";

import * as React from "react";

import TimePicker from "react-time-picker";

export type TimeProps = React.ComponentProps<typeof TimePicker>;

function Time({ className, ...props }: TimeProps) {
  return <TimePicker {...props} />;
}

Time.displayName = "Time";

export { Time };
