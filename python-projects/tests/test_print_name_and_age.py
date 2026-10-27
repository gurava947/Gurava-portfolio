import unittest

from support import run_solution


class PrintNameAndAgeTest(unittest.TestCase):
    def test_case_01_gurava_24(self):
        """Gurava, 24."""
        result = run_solution('print-name-and-age', 'Gurava\n24\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'Gurava is 24 years old\n')

    def test_case_02_rahul_30(self):
        """Rahul, 30."""
        result = run_solution('print-name-and-age', 'Rahul\n30\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'Rahul is 30 years old\n')

    def test_edge_01_two_empty_lines(self):
        """Two empty lines."""
        result = run_solution('print-name-and-age', '\n\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, ' is  years old\n')

    def test_edge_02_unicode_name(self):
        """Unicode name."""
        result = run_solution('print-name-and-age', 'గురు\n24\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'గురు is 24 years old\n')


if __name__ == "__main__":
    unittest.main()
