using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace RegionsAndCountries_api.Models
{
    public partial class Regio
    {
        public Regio()
        {
            Countries = new HashSet<Country>();
        }

        [Required(ErrorMessage = "Regid is required.")]
        public int Regid { get; set; }

        [Required(ErrorMessage = "Regname is required.")]
        public string Regname { get; set; } = null!;


        [JsonIgnore]
        public virtual ICollection<Country> Countries { get; set; }
    }
}
