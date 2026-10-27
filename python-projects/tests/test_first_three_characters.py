import unittest

from support import run_solution


class FirstThreeCharactersTest(unittest.TestCase):
    def test_case_01_python(self):
        """Python."""
        result = run_solution('first-three-characters', 'Python')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'Pyt\n')

    def test_case_02_hi(self):
        """Hi."""
        result = run_solution('first-three-characters', 'Hi')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'Hi\n')

    def test_edge_01_empty_string(self):
        """Empty string."""
        result = run_solution('first-three-characters', '\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '\n')

    def test_edge_02_unicode(self):
        """Unicode."""
        result = run_solution('first-three-characters', 'ಗುರು')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'ಗುರ\n')


if __name__ == "__main__":
    unittest.main()
