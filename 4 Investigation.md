# 4 Investigation

> This is the main chapter of the report. This is where you describe the investigation method, how the investigation started, what actions were taken, what outcomes came out of those actions and how the incident was resolved.
> 
> This chapter should be broken down into subchapters that describe the individual "subplots" of the investigation. This is guided by the investigation itself - typically compromised accounts, compromised endpoints, malware analysis and such can get their own chapters. If the description of an event runs several pages, it should be broken into constituent parts. Remember, that often different readers will have different emphasis on what chapters they focus on, so separating things like how accounts were compromised and abused from how the network segregation was not sufficient is a good idea.
> 
> For readability, use a monospace font to differentiate `usernames`, `servernames`, `ip addresses` and `software` used. This makes it easier to follow along the text when descriptive words are clearly separate from technical terms. Use code blocks for lists like IP addresses if such are presented. Remember, if a list is multiple pages long, it belongs in an attachment, not in the middle of the report.
> 
> For an example case, this chapter might look something like this:
# 4 Investigation
## 4.1 Account compromise for admin01
####     4.1.1 Initial access on admin endpoint
####     4.1.2 Privilege escalation attempts on endpoint
####     4.1.3 RDP password spraying attacks on domain controllers
## 4.2 Attacker activities on XMPL-DC02
####     4.2.1 Lateral movement and abusing CVE-2021-12345
####     4.2.2 Compromised credentials on server
####     4.2.3 File passwords.txt on server desktop
## 4.3 Indicators of compromise
####     4.3.1 Further activities from suspected IP addresses
####     4.3.2 YARA results on found malware hashes
