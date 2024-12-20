function BlockQuote(el)
    -- Check if the blockquote is empty (used for line breaks in Markdown)
    if #el.content == 0 then
        -- Insert a line break within the blockquote
        return pandoc.RawBlock("openxml", [[
            <w:p>
                <w:r>
                    <w:br/>
                </w:r>
            </w:p>
        ]])
    end

    -- Check if the blockquote starts with "[HELPER]"
    local first_element = el.content[1]
    if first_element and first_element.t == "Para" then
        local text = pandoc.utils.stringify(first_element)

        if text:sub(1, 8) == "[HELPER]" then
            -- Remove the "[HELPER]" marker and rebuild the first paragraph correctly
            local new_paragraph = pandoc.Para(pandoc.Str(text:gsub("^%[HELPER%]%s*", "")))

            -- Replace the original first paragraph with the modified one
            el.content[1] = new_paragraph

            -- Apply the "Helper" style
            return pandoc.Div(el.content, {
                ["custom-style"] = "Helper"
            })
        end
    end

    -- Apply the "BlockQuote" style to other blockquotes
    return pandoc.Div(el.content, {
        ["custom-style"] = "BlockQuote"
    })
end
