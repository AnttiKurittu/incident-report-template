function Code(el)
    -- Print the content of the inline code for debugging
    print("Inline code found: " .. pandoc.utils.stringify(el))

    -- Check if the content exists and is not nil
    if el.content and #el.content > 0 then
        -- Apply the "InlineCode" character style for inline code
        local span = pandoc.Span(el.content, {
            ["custom-style"] = "InlineCode"  -- Using "custom-style" for character styles
        })
        print("Applied style 'InlineCode' to: " .. pandoc.utils.stringify(span))
        return span
    else
        -- If no content, return the element unmodified
        return el
    end
end
