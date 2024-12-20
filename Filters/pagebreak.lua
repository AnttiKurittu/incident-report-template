function Header(el)
    -- Check if the heading is a top-level heading (level 1)
    if el.level == 1 then
        -- Insert a page break before the top-level heading
        return {pandoc.RawBlock("openxml", "<w:p><w:r><w:br w:type=\"page\"/></w:r></w:p>"), el}
    else
        -- Return the heading as is for other levels
        return el
    end
end
