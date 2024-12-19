# 6 Attachments

> This chapter holds data that can not be conveniently inserted into the report itself. For the sake of readability, any list or table that spans multiple pages should be summarized, attached and referenced. If files are attached, the list of attachments should carry a file hash to ensure that the files are not modified after report delivery.
> 
> The form and function of the attachments defines how they should be delivered. Often attachments can not be attached to a PDF document and will be delivered alongside them. For malware samples, use a password-protected archive like ZIP and note the password here. Some over-eager endpoint security tools try to open attachments that are encrypted to scan them, and using the industry-standard password `infected` is not recommended for this purpose. Generate a random password and add it to the list of attachments alongside with a file hash and description.
> 
> Common attachments in an investigation report include (but are not limited to):
>- Emails sent and received during the investigation
>- Lists of technical data like IP addresses, user accounts and such
>- Indicators Of Compromise found during the investigation
>- Pictures or diagrams that were referenced in the investigation timeline
>- Malware samples
>- Configuration files
>- Other documents that are not part of the incident report